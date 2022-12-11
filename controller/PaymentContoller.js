const userDB = require("../model/User");
const PaymentController = async (req, res) => {
    const { email, batch } = req.body;
    try {
        const user = await userDB.findOne({ email: email });
        if (!user) {
            res.json({ success: false, message: "user not found" });
            return;
        }
        if (user.paymentDate.length > 0 && user.paymentDate[user.paymentDate.length - 1].getMonth() === new Date().getMonth()) {
            res.json({ success: false, error: "Already paid" });
            return;
        }
        user.paymentDate = [...user.paymentDate, new Date()];
        user.batch = batch;
        await user.save();
        res.json({ success: true, message: "payment done" });
        return;
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: "Something went wrong!" });
        return;
    }
}
module.exports = {
    PaymentController,
};