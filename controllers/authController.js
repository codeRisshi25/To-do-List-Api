import User from '../models/User.js';

const signupController = async (req, res) => {
    try {
        const data = req.body;

        if (!data || !data.username || !data.password) {
            return res.status(400).json({ success: false, error: "username and password are required" });
        }

        const { username, password } = data;

        const existingUser = await User.checkIfExists(username);
        if (existingUser) {
            return res.status(409).json({ success: false, error: "User already exists" });
        }

        const user = await User.create({ username, password });
        if (!user) {
            return res.status(500).json({ success: false, error: "Failed to create user" });
        }
        console.log("user created successfully", user.uid )
        return res.status(201).json({ success: true, message: "User created successfully", userId: user.uid });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const loginController = () =>{}
const logoutController = () => {}



export { signupController , loginController, logoutController };