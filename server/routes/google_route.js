const { Router } = require("express");
const googleController = require("../controllers/google_controller");
const router = Router();

router.get("/google", googleController.getuser);
router.get("/auth/google", googleController.getauthenticate);
router.get("/google/callback", googleController.callback);
router.get("/protected", googleController.protected, (req, res) => {
  res.redirect("http://localhost:3000/");
});
router.get("/logout", googleController.logout);
router.get("/auth/google/failure", googleController.fail);

module.exports = router;
