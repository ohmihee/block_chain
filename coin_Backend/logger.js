// 참고 사이트 https://velog.io/@ash/Node.js-%EC%84%9C%EB%B2%84%EC%97%90-logging-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-winston-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0

const winston = require('winston')
const {format} = require('winston')

const logger = winston.createLogger({
    level:'info',
    format: winston.format.json(),
})
// winston을 그냥 logger로 바꾸겠다.
// 안에 인자값은 객체로 쓴다.

// NODE_ENV 환경변수 production(배포용) development(개발용)
// 배포할 때와 개발할 때 코드가 다르면 안된다.
// 즉 test용 코드도 실제 배포용 코드와 같아야 한다.
// 코드 수정이 배포용에 바로 반영될 수 있도록

if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({format:format.simple()}))
    
}

module.exports = logger