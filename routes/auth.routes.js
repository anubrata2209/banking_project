const controller = require("../controllers/authController");
const { verifyUserRole } = require("../middleware/auth");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

app.post("/api/auth/register", controller.register);  
app.post("/api/auth/login", controller.login);
// app.get("/api/auth/myprofile", controller.myprofile);

}