const userModel =require('../models/usermodel')
const bcryptjs=require('bcryptjs')
async function register(req, res) {
    try {
        const { name, email, password, profile_pic } = req.body;
        console.log("Incoming registration data:", { name, email, profile_pic });

        const checkemail = await userModel.findOne({ email });
        
        if (checkemail) {
            return res.status(200).json({
                message: 'User already exists',
                error: true
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashpassword,
            profile_pic
        };

        const user = new userModel(payload);
        const userSave = await user.save();
        
        return res.status(201).json({ 
            message: "User created successfully",
            data: userSave,
            success: true
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

async function login(req, res) {
    try {
        const { email } = req.body;
        const checkemail = await userModel.findOne({ email }).select("-password");

        if (!checkemail) {
            return res.status(400).json({
                message: "User does not exist",
                error: true,
            });
        }

        return res.status(201).json({
            message: "User logged in",
            success: true,
            data: checkemail
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message || error,
            error: true
        });
    }
}
async function logout(req,res){
    try{
        const cookieOption={
            http:true,
            secure:true
        }
      return res.cookie("token",'',cookieOption).status(201).json({
        message:"logout successfully",
        success:true
      })
    }
    catch(error){
        return res.status(500).json({
            error: error.message || error,
            error: true
        });  
    }
}
module.exports = { register, login,logout };
