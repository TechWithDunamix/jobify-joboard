export const logError = (err,req,res,next) => {
    if (err){
        console.log(err)
        res.status(500).send(err)
    }

    next()
}

