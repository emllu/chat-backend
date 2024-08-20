const getuserdeatailfromcookie = require("../helper/getuserdetailfromcookie");
const userModel = require("../models/usermodel");
async function userdetail(request,response){
   
        try {
            const token = request.cookies.token || ""
    
            const user = await getuserdeatailfromcookie(token)
    
            return response.status(200).json({
                message : "user details",
                data : user

            })
        } catch (error) {
            return response.status(500).json({
                message : error.message || error,
                error : true
            })
        }
    }
    
    
async function userUpdate(request,response){
 try {
            const token = request.cookies.token || ""
    
            const user = await getuserdeatailfromcookie(token)
    
            const { name, profile_pic } = request.body
    
            const updateUser = await userModel.updateOne({ _id : user._id },{
                name,
                profile_pic
            })
    
            const userInfomation = await userModel.findById(user._id)
    
            return response.json({
                message : "user update successfully",
                data : userInfomation,
                success : true
            })
    
    
        } catch (error) {
            return response.status(500).json({
                message : error.message || error,
                error : true
            })
        }
    }
    
    module.exports = {userdetail,userUpdate}