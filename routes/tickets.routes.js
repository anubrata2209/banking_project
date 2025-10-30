const controller = require("../controllers/ticketController");
const { verifyUserRole } = require("../middleware/auth");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

app.post("/api/add/tickets", controller.createTicket);  
app.get("/api/get/tickets", controller.getAllTickets);
app.get("/api/get/tickets/:id", controller.getAllTicketsbyId);
app.post("/api/update/tickets/:id", controller.updateTicketbyId);

app.post("/api/delete/tickets/:id", controller.deleteTicketbyId);
}