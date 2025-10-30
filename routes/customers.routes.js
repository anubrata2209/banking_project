const controller = require("../controllers/customerController");
const { verifyUserRole } = require("../middleware/auth");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

app.post("/api/add/customers", controller.createCustomer);  
app.get("/api/get/customers", controller.getAllCustomers);
app.get("/api/get/customers/:id", controller.getAllCustomersbyId);
app.post("/api/update/customers/:id", controller.updateCustomerbyId);

app.post("/api/delete/customers/:id", controller.deleteCustomerbyId);
}