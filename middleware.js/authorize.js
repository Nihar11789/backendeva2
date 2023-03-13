const authorize = (user_role)=>{
    return(req,res,next)=>{
        const userrole = req.body.userrole;
        if(user_role.includes(userrole)){
            next()
        } else {
            res.send("not authorized")
        }
    }
}

module.exports = {authorize};