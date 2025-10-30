const controller = require("../controllers/loanController");
const { verifyUserRole } = require("../middleware/auth");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

app.post("/api/add/loans", controller.createLoan);  
app.get("/api/get/loans", controller.getAllLoans);
app.get("/api/get/loans/:id", controller.getAllLoansbyId);
app.post("/api/update/loans/:id", controller.updateloansbyId);

//action endpoint to change status (verify, approve, reject, disburse, close)
app.post("/api/update/loans/:id/action", controller.updateloanstatus);

app.post("/api/delete/loans/:id", controller.deleteloanbyId);
}

// const express = require('express');
// const router = express.Router();
// const { auth, permit } = require('../middleware/auth');
// const { performAction } = require('../controllers/loanController');

// router.post('/:id/action', auth, permit('agent','underwriter','manager','admin'), performAction);

// module.exports = router;