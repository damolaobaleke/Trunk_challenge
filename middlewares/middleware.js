const {failureRespMsg} = require('../utils/response')

let middleWareObj = {
    checkValidParams:(req, res, next)=>{
        
        let sortByParams = {
            id:req.query.sortBy,
            reads:req.query.sortBy,
            likes:req.query.sortBy,
            popularity:req.query.sortBy
        }



        for (let parameter in sortByParams){
            //if value put in is not equal to any of the keys in the object
            if(req.query.sortBy != parameter){
                failureRespMsg(res, 400, 'sortBy Parameters is invalid', null)
            }else{
                next()
            }
        }
    }
}

module.exports = middleWareObj;