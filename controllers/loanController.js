const Loan = require('../models/loan');

const performAction = async (req, res) => {
  const { id } = req.params;
  const { action, comment } = req.body;
  const userId = req.user.id;

  const loan = await Loan.findById(id);
  if (!loan) return res.status(404).send({ error: 'Loan not found' });

  const now = new Date();
  const auditEntry = { action, by: userId, at: now, meta: { comment } };

  switch(action) {
    case 'verify':
      if (loan.status !== 'application') return res.status(400).send({ error: 'Invalid state' });
      loan.status = 'verification';
      break;
    case 'underwrite':
      if (!['verification','application'].includes(loan.status)) return res.status(400).send({ error: 'Invalid state' });
      loan.status = 'underwriting';
      break;
    case 'approve':
      loan.status = 'approved';
      loan.approvedAt = now;
      break;
    case 'reject':
      loan.status = 'rejected';
      break;
    case 'disburse':
      if (loan.status !== 'approved') return res.status(400).send({ error: 'Only approved loans can be disbursed' });
      loan.status = 'disbursed';
      loan.disbursedAt = now;
      // optionally create schedule here
      break;
    case 'close':
      loan.status = 'closed';
      break;
    default:
      return res.status(400).send({ error: 'Unknown action' });
  }

  loan.audit.push(auditEntry);
  if (comment) loan.notes.push({ by: userId, text: comment, createdAt: now });

  await loan.save();
  return res.send(loan);
};

module.exports = { performAction };
