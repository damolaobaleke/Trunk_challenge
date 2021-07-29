const axios = require('axios');
const {successRespMsg, failureRespMsg} = require('../../utils/response')
const posts = new Map();

module.exports = {
    getPosts: async (req, res)=>{
        //Tags parameters
        let tagParams =  req.query.tags.split(",")
        console.log(tagParams)

        tagParams.forEach((tag)=>{
            console.log(tag)
        })

        //Sorting parameters
        let sortByParams = ["id", "likes", "popularity", "reads"]
        
        //direction
        let directionParams = req.query.direction;
        let direction = directionParams ? directionParams.toLowerCase() : null
        console.log(`The direction parameter ${direction}`)

        if(tagParams[0] === undefined){
            return failureRespMsg(res, 400, 'Tags parameter required', null)
        }
        
        let request = [];
        
        tagParams.forEach((tag)=>{
           request.push(axios.get(`https://hatchways.io/api/assessment/blog/posts?tag=${tag}&sortBy=${req.query.sortBy}&direction=${direction}`))
        })

        console.log('The request array ' + request)

        //concurrent request
        axios.all(request).then(axios.spread((...response) => {
            response.forEach((resp)=>{
                //get unique posts with tags and prevent duplicate posts from the responses
                resp.data.posts.forEach((post)=>{
                    posts.set(post.id, post)
                    //console.log(posts.values())
                })
            })


        })).then(()=>{
            if(posts.size != 0){
                //console.log(posts.values())
                // return successRespMsg(res, 200, 'Gotten posts successfully', Array.from(posts.values()))
                let data = Array.from(posts.values())

                /*Conditions for the (optional)sortBy query parameter*/
                if(req.query.sortBy == undefined){
                    //default sort by id
                    req.query.sortBy = "id"
                    // return successRespMsg(res, 200, 'Gotten posts successfully', Array.from(posts.values()))
                
                    /*Conditions for the (optional)direction query parameter*/
                    if(direction == "asc"){
                        checkDirection(direction, data)
                        return successRespMsg(res, 200,'Gotten posts successfully', data)

                    }else if(direction == "desc"){
                        checkDirection(direction, data)
                        console.log(res.statusCode)
                        return successRespMsg(res, 200,'Gotten posts successfully', data)
        
                    }else if(direction == null  || direction == ""){
                        //default to ascending
                        direction = "asc"
                        console.log(`The direction parameter ${direction}`)
                        return successRespMsg(res, 200,'Gotten posts successfully', data)
                    }else{
                        return failureRespMsg(res, 400,'direction parameter is invalid', null)
                    }

                }else{

                    /**Condition for accepted sortyBy parameters */
                    if(sortByParams.includes(req.query.sortBy)){

                        if(direction == "asc"){
                            checkDirection(direction, data)
                            return successRespMsg(res, 200, 'Gotten posts successfully', data)
    
                        }else if(direction == "desc"){
                            checkDirection(direction, data)
                            return successRespMsg(res, 200, 'Gotten posts successfully', data)
            
                        }else if(direction == null  || direction == ""){
                            direction = "asc"
                            console.log(`The direction parameter ${direction}`)
                            return successRespMsg(res, 200, 'Gotten posts successfully', data)
                        }else{
                            return failureRespMsg(res, 400, 'direction parameter is invalid', null)
                        }

                    }else{
                        console.log(`Not an accepted parameter for sorting ${req.query.sortBy}`)
                        return failureRespMsg(res, 400, 'sortBy Parameters is invalid', null)
                    }
                }



            }else{
                return failureRespMsg(res, 400, 'Failed to get posts', Array.from(posts.values()))
            }

        }).then(()=>{
           
        
        })
        .catch(errors => {
            console.log(errors);
        })

    
        // if(resp.status == 200){
        //     console.log(resp.data)
        //     return successRespMsg(res, 200, 'Gotten posts successfully', resp.data)
        // }else{
        //     return failureRespMsg(res, resp.status, 'Failed to get posts', resp.data)
        // }


    },


    getPing:(req, res)=>{
        console.log(res)

        if(res.statusCode == null){
            res.send({success: true})
        }else{
            return successRespMsg(res, res.statusCode, null, null)
        }
    },    

}

const filterByDirection=(direction, data)=>{
}

const checkDirection = (dir, posts)=>{
    if(dir == "asc"){
        posts.sort()
    }else {
        posts.sort().reverse()
    }
}