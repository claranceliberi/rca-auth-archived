const {CommonControllerConfig} = require("../common/common.controller.config")
const models = require('../../database/postgresSql/models/index')
const Joi = require('joi')
const crypto = require('crypto')

const Privilege = models.Privilege

class PrivilegeController extends CommonControllerConfig{

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




}


exports.AppsController = AppsController