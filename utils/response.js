const successResponseMessage  = (res, success, message ,data)=>{
    res.status(success).json({
        success: true,
        statusCode:res.statusCode,
        message,
        data
    })
}

const failureResponseMessage  = (res, success, message ,data)=>{
    res.status(success).json({
        success: false,
        statusCode:res.statusCode,
        message,
        data
    })
}

module.exports.successRespMsg = successResponseMessage;
module.exports.failureRespMsg = failureResponseMessage;
