const {CommonControllerConfig} = require("../common/common.controller.config")
const models = require('../../database/postgresSql/models/index')
const fs = require('fs')
const path = require('path')
const Joi = require('joi')
const NodeRSA = require('node-rsa')
const {privateRSAKEY} = require('../../config/secured.vals')


const Privilege = models.Privilege

class PrivilegesController extends CommonControllerConfig{

    key = new NodeRSA(privateRSAKEY)

    constructor() {
        super("PrivilegeController");
    }



    //get all privileges
    all = async (req, res) => {
            try{
                const privileges= await Privilege.findAll() ;
                res.send(this.s('success',privileges))

            }catch (e) {
                res.send(this.s('failed',e,500))
            }
    }

    //create privilege
    create = async (req, res) => {
        const privilege = await this.#create_privilege(req,true)

        return res.send(privilege)
    }



    //get privilege by id
    getById = async (req, res) => {

        try{

            const privilege = await Privilege.findOne({where:{id:req.params.id}})

            res.send(this.s('success',privilege))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }

    //get privilege by user id
    getByUserId = async (req, res) => {

        try {
            const privilege = await Privilege.findOne({where:{userId:req.params.userId}})

            res.send(this.s('success',privilege))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }


    //get privilege by app id
    getByAppId = async (req, res) => {

        try {
            const privilege = await Privilege.findOne({where:{appId:req.params.appId}})

            res.send(this.s('success',privilege))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }


    // update privilege
    put = async (req,res) => {

        try{
            //extract privilege body object
            let {id, viewProfile} = req.body

            //validator format
            const schema = Joi.object({
                id:Joi.number().required(),
                viewProfile:Joi.boolean().required(),
            })



            const {error} = schema.validate(req.body)

            //checking error
            if(error)
                res.send(this.s('failed',error.details[0].message,409))

            else{

                //check if app exists
                const privilege = await Privilege.findOne({where:{id},plain:true})

                if(privilege){

                   try{


                        //update app
                        const updatedApp = await Privilege.update(
                            {viewProfile},
                            {where:{id},
                            returning:true,
                            })

                        res.send(this.s('success',updatedApp[1]))

                   }catch (e){
                        res.send(this.s('failed',e,500))
                   }

                }else{
                    res.send(this.s('failed','app does not exists'))
                }

            }

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }


    #create_privilege = async (req,with_token=false)=>{
         let {userId,appId,viewProfile} = req.body


        try{

                //validator format
                const schema = Joi.object({
                    userId:Joi.string().required().min(20),
                    appId:Joi.string().required(),
                    viewProfile:Joi.boolean().required(),
                })

                const {error} = schema.validate(req.body)

                //checking error
                if(error)
                    return (this.s('failed',error.details[0].message,409))

                else{


                    //check if app exists
                    const privilege = await Privilege.findOne({where:{userId,appId},plain:true})
                    let result = '';

                    if(privilege){//if privilege exists let us update it
                        result = await Privilege.update({viewProfile}, {where:{id:privilege.id}, returning:true,})    //update privilege
                        result = result[1]
                    }

                    else // if it does not exist let us create
                        result = await Privilege.create({userId, appId , viewProfile})

                    if(with_token){
                        const data_to_encrypt = `uid:${userId},aid:${appId},vp:${viewProfile}`
                        const token = this.#privilege_token(data_to_encrypt)

                        result = {...result[0].dataValues,token}
                    }

                    return (this.s('success',result))

                }

        }catch (e) {
           return (this.s('failed',e,500))
        }
    }


    // generate privilege_token
    #privilege_token = (data) => {
        return this.key.encrypt(data, 'base64');
    }

    //decrypt privilege token
    #decrypt_privilege_token = (token) => {
        return this.key.decrypt(token,'utf8')
    }



}


exports.PrivilegesController = PrivilegesController