const userDB = require("../model/User");


const registerController = async (req, res) => {
    const { email, name, age, batch } = req.body;
    if (!name || typeof name !== "string" || !email || typeof email !== "string" || !age || typeof age !== "string" || !batch || typeof batch !== "string") {
        res.json({ success: false, error: "Incorrect Credentials" });
        return;
    }
    const checkDuplicate = await userDB.findOne({ email: email });
    if (checkDuplicate) {
        res.json({ success: false, error: "Email already exists" });
        return;
    }
    try {
        const response = await userDB.create({ name, email, age, batch, paymentDate: [] });
        res.status(201).json({ success: true, message: "Created" });
        return;
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: "Something went wrong!" });
        return;
    }
}
const getData = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await userDB.findOne({ email: email });
        if (!user) {
            res.json({ success: false, message: "user not found" });
            return;
        }
        user.paymentDate = [...user.paymentDate, new Date()];
        await user.save();
        res.json({ success: true, user: user });
        return;
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: "Something went wrong!" });
        return;
    }
}

module.exports = {
    registerController,
    getData
};