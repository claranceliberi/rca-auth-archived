const {CommonControllerConfig} = require("../common/common.controller.config")
const models = require('../../database/postgresSql/models/index')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const Client = models.Client

class ClientsController extends CommonControllerConfig{

    constructor() {
        super('ClientsController');
    }

    all = async (req, res) => {
            try{
                const clients= await Client.findAll() ;
                res.send(this.s('success',clients))

            }catch (e) {
                res.send(this.s('failed',e,500))
            }
    }


    create = async (req, res) => {
        let {firstName,secondName,email,password} = req.body


        try{
            const userExist = await Client.findOne({where:{email}})


            //check if user exists
            if( userExist !== null && userExist.hasOwnProperty('email'))
                res.send(this.s('failed',"email already exists",500))

            else{

                //validator format
                const schema = Joi.object({
                    firstName:Joi.string().required().min(2),
                    secondName:Joi.string().required().min(2),
                    email:Joi.string().email().required().min(5),
                    password:Joi.string().required(),
                })

                const {error} = schema.validate(req.body)

                //checking error
                if(error)
                    res.send(this.s('failed',error.details[0].message,409))

                else{

                    const salt = bcrypt.genSaltSync(10)
                    password = bcrypt.hashSync(password,salt)

                    const result = await Client.create({firstName, secondName, email, password})

                    res.json(this.s('success',result))
                }
            }

        }catch (e) {
            res.json(this.s('failed',e,500))
        }
    }

    get = async (req, res) => {

        try{

            const client = await Client.findOne({where:{id:req.params.clientId}})

            res.send(this.s('success',client))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }

    getByEmail = async (req, res) => {

        try {
            const client = await Client.findOne({where:{email:req.params.email}})

            res.send(this.s('success',client))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }



    put = async (req,res) => {

        try{
            //extract user object
            const {firstName,secondName,email,password} = req.body

            //check if user already exists
            const client = await Client.findOne({where:{id:req.params.clientId}})

            console.log(client.email)

            if(client && client.email){

               try{

                   //validator format
                    const schema = Joi.object({
                        id:Joi.number().required().min(1),
                        firstName:Joi.string().required().min(2),
                        secondName:Joi.string().required().min(2),
                        email:Joi.string().email().required().min(5),
                        password:Joi.string().required(),
                    })

                    const {error} = schema.validate(req.body)

                    //checking error
                    if(error)
                        res.send(this.s('failed',error.details[0].message,409))
                    else{

                        //update user
                        const updatedUser = await Client.update(
                            {firstName,secondName,email,password},
                            {where:{id:req.params.clientId},
                            returning:true,
                            })

                        res.send(this.s('success',updatedUser[1]))
                    }

               }catch (e){
                    res.send(this.s('failed',e,500))
               }


            }else{
                res.send(this.s('failed','user does not exists'))
            }

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }


    delete = async (req, res) => {

        try{
            const deletedUser = await Client.destroy({where:{id:req.params.clientId}})

            if(deletedUser === 1)
                res.send(this.s('success',"user deleted"))
            else
                res.send(this.s('failed',"user does not exists, may be already deleted or was not created"))


        }catch (e) {
            res.send(this.s('failed',e))
        }
    }
}

exports.ClientsController = ClientsController