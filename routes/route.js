const { Router } = require("express");
const AuthControllers = require("../controller/AuthController");
const PaymentController = require("../controller/PaymentContoller");

const router = Router();
router.post("/get", AuthControllers.getData)
router.post("/register", AuthControllers.registerController);
router.post("/payment", PaymentController.PaymentController);

module.exports = router;