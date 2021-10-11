// 참고 예제 블로그 https://xively.tistory.com/21

const winston = require('winston')
require('winston-daily-rotate-file')
const logDir = 'logs'

const levels = {
    error:0,
    warn:1,
    info:2,
    http:3,
    debug:4
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env ==='development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error:'red',
    warn:'yellow',
    info:'grennt',
    http:'magenta',
    debug:'blue'
}

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({format:'YYYY-MM-DD HH:MM:DD ||'}),
    winston.format.colorsize({all:true}),
    winston.format.printf(
        (info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`,
    )
)
const logger = winston.createLogger({
    format,
    level:level(),
    transports:[
        new winston.transports.DailyRotateFile({
            level:'info',
            datePattern:'YYYY-MM-DD',
            dirname:logDir,
            filename:`%DATE%.log`,
            zippedArchive:true,
            handleExceptions:true,
            maxFiles:30
        }),
        new winston.transports.DailyRotateFile({
            level:'error',
            datePattern:'YYYY-MM-DD',
            dirname:logDir + '/error',
            filename:``
        })
    ]
})