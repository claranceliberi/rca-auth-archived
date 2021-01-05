const {CommonControllerConfig} = require("../common/common.controller.config")
const {AuthenticationController} = require("../authentication/authentication.controller")
const models = require('../../database/postgresSql/models/index')


const App = models.App
class AppsController extends CommonControllerConfig{

    constructor() {
        super("AppsController");
    }



    //get all apps
    all = async (req, res) => {
            try{
                const apps= await App.findAll() ;
                res.send(this.s('success',apps))

            }catch (e) {
                res.send(this.s('failed',e,500))
            }
    }

        //create client
    create = async (req, res) => {
        let {name,redirectUrl} = req.body


        try{

                //validator format
                const schema = Joi.object({
                    name:Joi.string().required().min(2),
                    redirectUrl:Joi.string().uri().required().min(2),
                })

                const {error} = schema.validate(req.body)

                //checking error
                if(error)
                    res.send(this.s('failed',error.details[0].message,409))

                else{

                    const randomNumber = Math.floor(Math.random() * Date.now())
                    const appId = Date.now() + randomNumber //make sure that e get different number at the highest level
                    let secretKey = crypto.randomBytes(64).toString('hex'); //secretKey
                    let {id:clientId} = AuthenticationController.userFromToken(req)

                    const result = await App.create({name, redirectUrl, appId, secretKey,clientId})

                    res.json(this.s('success',result))
                }

        }catch (e) {
            res.json(this.s('failed',e,500))
        }
    }


    //get app by id
    getById = async (req, res) => {

        try{

            const app = await App.findOne({where:{id:req.params.id}})

            res.send(this.s('success',app))

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }

    //get app by app id
    getByAppId = async (req, res) => {

        try {
            const app = await App.findOne({where:{appId:req.params.appId}})

            res.send(this.s('success',app))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }

    //get client by creator based on his id
    getByClient = async (req, res) => {

        try {
            const apps = await App.findAll({where:{clientId:req.params.clientId}})

            res.send(this.s('success',apps))
        }catch (e) {
            res.send(this.s('failed', e, 500))
        }
    }

    // update app
    put = async (req,res) => {

        try{
            //extract user object
            const {name,redirectUrl, appId} = req.body

            //check if user already exists
            const app = await App.findOne({where:{appId}})


            if(app && app.email){

               try{

                   //validator format
                    const schema = Joi.object({
                        name:Joi.string().required().min(2),
                        redirectUrl:Joi.string().uri().required().min(2),
                    })


                    const {error} = schema.validate(req.body)

                    //checking error
                    if(error)
                        res.send(this.s('failed',error.details[0].message,409))

                    else{

                        //update app
                        const updatedApp = await App.update(
                            {name,redirectUrl},
                            {where:{appId},
                            returning:true,
                            })

                        res.send(this.s('success',updatedApp[1]))
                    }

               }catch (e){
                    res.send(this.s('failed',e,500))
               }


            }else{
                res.send(this.s('failed','app does not exists'))
            }

        }catch (e) {
            res.send(this.s('failed',e,500))
        }
    }

    //delete client
    delete = async (req, res) => {

        try{
            const deletedApp = await App.destroy({where:{appId:req.params.appId}})

            if(deletedApp === 1)
                res.send(this.s('success',"app deleted"))
            else
                res.send(this.s('failed',"app does not exists, may be already deleted or was not created",409))


        }catch (e) {
            res.send(this.s('failed',e))
        }
    }


}


exports.AppsController = AppsController