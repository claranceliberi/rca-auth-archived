import {transports,format} from "winston";
import {logger,errorLogger} from 'express-winston'




let _logger = logger({
    transports:[
        new transports.File({
            maxsize:5120000,
            maxFiles:5,
            filename:`${__dirname}/logs/log-api.log`
        }),
        new transports.Console()
    ],
    format: format.combine(format.colorize(), format.json())
})

let _errorLogger = errorLogger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.json())
})

export {
    _logger, _errorLogger
}