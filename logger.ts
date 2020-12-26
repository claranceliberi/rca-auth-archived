import {transports,format} from "winston";
import {logger,errorLogger} from 'express-winston'


const { combine, timestamp, label, printf ,colorize, json, prettyPrint } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});


let file_logger = logger({
    transports:[
        new transports.File({
            maxsize:5120000,
            maxFiles:5,
            filename:`${__dirname}/logs/log-api.log`
        }),
    ],
    format: format.combine(format.colorize(), format.json())
})

let console_logger = logger({
    transports:[new transports.Console()],
    format: combine(colorize(),prettyPrint(), json(),timestamp(),myFormat)
})


let _errorLogger = errorLogger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.json())
})

export {
    file_logger, _errorLogger,
    console_logger
}