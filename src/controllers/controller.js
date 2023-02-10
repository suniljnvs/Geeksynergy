const bcrypt = require("bcrypt");
const saltRounds = 10;
let userModel = require("../models/userModel");

let createUser = async function (req, res) {
    try {
        const requestBody ={
            name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            profession: req.body.profession
        };
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
        requestBody.password = hashedPwd
        
        let email = req.body.email;
        if (!email) {
            throw new Error("Email is required")
        }

        const newUser = await userModel.create(requestBody);

        res.status(201).send({ status: true, message: "User created successfully", data: newUser })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const login = async function(req,res){
    try {
        const requestBody = req.body;
        const { email, password } = requestBody;
       

        const user = await userModel.findOne({email});
       
        if(user){
            const matchdata = await bcrypt.compare(password, user.password);

            if(matchdata){
                return res.send({status:true, message: "login successfully"})
            }else{
                return res.send({status: false, message:"Wrong email or password."})
            }

        }else{
            return res.send({status: false, message:"Wrong email or password."});
        }
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

const getUsers = async function(req,res){
    try {
        
        const all_data = await userModel.find({});
        res.status(200).send({ status: true, message: "Get all Users data successfully", data: all_data })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const updateUser = async function(req,res){
    try {
        let userId = req.body.user_Id;
        const requestBody ={
            name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no
        };
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
        requestBody.password = hashedPwd
        

        const updateUser = await userModel.findOneAndUpdate({ _id: userId }, { ...requestBody }, { new: true });
      
        return res.status(200).send({ status: true, message: "User Data Updated Successfully", data: updateUser });
        
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const deleteUser = async function(req,res){
    try {
        const userId = req.body.user_Id
       
        const deletedata = await userModel.remove({_id: userId});
        return res.send({ status: true, message: "Deleted Successfully" })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const forgetPassword = async function(req,res){
    try {
        const requestBody = req.body
        const {email} = requestBody;

        const data = await userModel.findOne({email:email});
        if(!data){
            throw new Error("This email not registerd")
        }

        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {createUser, login, getUsers , updateUser ,deleteUser,forgetPassword}