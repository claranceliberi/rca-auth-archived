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

        const users = User.find((err,users) =>{
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
            const user =await User.findOne({email:req.body.email})

            if(user)
                res.send(s('failed','user already exists with that email',409))
            else {

                const salt = bcrypt.genSaltSync(10)
                req.body.password = bcrypt.hashSync(req.body.password,salt)

                const createdUser = User.create(req.body,(err,user) => {


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

        const user = User.findById(req.params.userId,(err,user) => {
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

        const user = User.findByIdAndUpdate(id,req.body,{new:true},(err,user) => {
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

        const user = User.findByIdAndDelete(req.params.userId,{},(err,user) => {
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

            //if app exists
            if(app){

                //if the secreteKey is correct
                if(app.secretKey === secretKey){
                    const privilegesInstance = new PrivilegesController()
                    const decryptedToken = privilegesInstance.decrypt_privilege_token(userToken)
                    const permissions = decryptedToken.split(',')
                    const permissionsObject = {}

                    //converting array to object
                    permissions.forEach(val => {
                        val = val.split(":")
                        permissionsObject[val[0]] = val[1]
                    })

                    //verify if the asking app is already in the token
                    if(+appId === +permissionsObject.aid ){
                        const user = await User.findById(permissionsObject.uid).select(['-password','-_id','-__v'])

                        res.send(this.s('success',user))
                    }else{
                         res.send(this.s('failed','invalid token',401))
                    }


                }else{
                    res.send(this.s('failed','not authorized',401))
                }
            }else{
                res.send(this.s('failed','not authorized',401))
            }
        }catch(err){
            res.send(this.s('failed',{error},500))
        }
    }

}

exports.UsersController = UsersController