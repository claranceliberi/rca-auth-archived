const debug = require('debug')
const {CommonControllerConfig} = require("../common/common.controller.config");
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const models = require('../../database/postgresSql/models/index')
const {PrivilegesController} = require('../privillege/privilege.controller')

const User = require('../../models/user.model')
const App = models.App

// initiating debugger
const d = debug("UserController")

class UsersController extends CommonControllerConfig{
    constructor() {
        super('UserController');

    }

    //get all users
    all = (req,res)=>{
        const s = super.s

        let users = User.find((err,users) =>{
            if(err)
                res.send(s('failed',err,500))
            else if(users === null)
                res.send(s('success',users,404))
            else
                res.send(s('success',users))
        } )
    }

    //create user
    create = async (req,res) =>{
        const s = this.s

        //validator format
        const schema = Joi.object({
            first_name:Joi.string().required().min(2),
            second_name:Joi.string().required().min(2),
            email:Joi.string().email().required().min(5),
            password:Joi.string().required(),
        })

        const {error} = schema.validate(req.body)

        //checking error
        if(error)
            res.send(s('failed',error.details[0].message,409))

        else {
            //checking if user exists
            let user =await User.findOne({email:req.body.email})

            if(user)
                res.send(s('failed','user already exists with that email',409))
            else {

                const salt = bcrypt.genSaltSync(10)
                req.body.password = bcrypt.hashSync(req.body.password,salt)

                let createdUser = User.create(req.body,(err,user) => {


                    if(err)
                        res.send(s('failed',err,500))
                    else
                        res.send(s('success',user))
                })

            }

        }

    }

    //get user with id
    get(req,res){
        const s = super.s

        let user = User.findById(req.params.userId,(err,user) => {
            if(err)
                res.send(s('server error',err,500))
            else if(user === null)
                res.send(s('no found',user,404))
            else
                res.send(s('found',user))
        })
    }

    // update user
    update(req,res){
        const s = super.s

        const id = req.body.id //get id from body
        delete req.body.id //delete id in body

        let user = User.findByIdAndUpdate(id,req.body,{new:true},(err,user) => {
            if(err)
                res.send(s('not updated',err,500))
            else if(user === null)
                res.send(s('no user found',user,404))
            else
                res.send(s('found',user))
        })
    }


    // delete user
    delete(req,res){
        const s = super.s

        let user = User.findByIdAndDelete(req.params.userId,{},(err,user) => {
            if(err)
                res.send(s('not deleted',err,500))
           else if(user === null)
                res.send(s('no user found',user,404))
            else
                res.send(s('deleted',user))
        })
    }


    //get user by token
    get_user_by_token = async (req,res) => {
        const {userToken,secretKey,appId} = req.body

        try{
            const app = await App.findOne({where:{appId}})

            if(app){    //if app exists

                if(app.secretKey === secretKey){    //if the secreteKey is correct
                    const privilegesInstance = new PrivilegesController()
                    const decryptedToken = privilegesInstance.decrypt_privilege_token(userToken)
                    const permissions = decryptedToken.split(',')
                    console.log(permissions)

                    res.send(this.s('success',permissions))

                }else{
                    res.send(this.s('failed','not authorized',401))
                }
            }else{
                res.send(this.s('failed','not authorized',401))
            }
        }catch(err){
            console.log(err)
        }
    }


}

exports.UsersController = UsersController