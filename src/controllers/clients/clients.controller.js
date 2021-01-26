const {CommonControllerConfig} = require("../common/common.controller.config")
const models = require('../../database/postgresSql/models/index')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const Client = models.Client

class ClientsController extends CommonControllerConfig{

    /**
     * controller that manage clients management requests
     * @constructor
     */
    constructor() {
        super('ClientsController');
    }

    //get all clients
    all = async (req, res) => {
            try{
                const clients= await Client.findAll() ;
                res.send(this.s('success',clients))

            }catch (e) {
                res.send(this.s('failed',e,500))
            }
    }


    //create client
    create = async (req, res) => {
        let {firstName,secondName,email,password} = req.body


        try{

            //validator format
            const schema = Joi.object({
                firstName:Joi.string().required().min(2),
                secondName:Joi.string().required().min(2),
                email:Joi.string().email().required().min(5),
                password:Joi.string().required(),
            })
            const {error} = schema.validate(req.body)

            //errors in attributes
            if(error)
                res.send(this.s('failed',error.details[0].message,406))
            else{

            const userExist = await Client.findOne({where:{email}})

                // checking if client exists
                if(userExist)
                    res.send(this.s('failed',"email already exists",409))
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

    //get client by id
    getById = async (req, res) => {

        try{

            const client = await Client.findOne({where:{id:req.params.clientId}})

            res.send(this.s('success',client))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }

    //get client by email
    getByEmail = async (req, res) => {

        try {
            const client = await Client.findOne({where:{email:req.params.email}})

            res.send(this.s('success',client))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }



    // update client
    put = async (req,res) => {

        try{
            //extract user object
            const {firstName,secondName,email,password} = req.body

            //check if user already exists
            const client = await Client.findOne({where:{id:req.params.clientId}})

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
                        const updatedClient = await Client.update(
                            {firstName,secondName,email,password},
                            {where:{id:req.params.clientId},
                            returning:true,
                            })

                        res.send(this.s('success',updatedClient[1]))
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


    //delete client
    delete = async (req, res) => {

        try{
            const deletedUser = await Client.destroy({where:{id:req.params.clientId}})

            if(deletedUser === 1)
                res.send(this.s('success',"client deleted"))
            else
                res.send(this.s('failed',"client does not exists, may be already deleted or was not created",409))


        }catch (e) {
            res.send(this.s('failed',e))
        }
    }
}

exports.ClientsController = ClientsController