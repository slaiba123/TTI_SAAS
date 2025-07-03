import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all the fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const user = new userModel(userData);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user: {     
        _id: user._id,
        name: user.name,
        email: user.email },
    });
    
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ message: error.message, success: false });
  }
};

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        else{
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({
                success: true,
                message: "Login successful",
                token,
                user: {     
                  _id: user._id,
                  name: user.name,
                  email: user.email},
            });
        }
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.json({ message: error.message, success: false });
    }
}


const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id); // from middleware

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      credits: user.creditBalance,
      user: {
        _id: user._id,       // ✅ include the ID
        name: user.name,
        email: user.email    // (optional) include more if needed
      },
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export { loginUser, registerUser,userCredits };             

// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login