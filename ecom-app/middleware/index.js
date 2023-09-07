
// Function to check if user is logged in or not
const isLoggedIn = async (req, res, next) => {
    const auth = req.headers['authorization'];

    if(auth) {
        // verify if its a vailid token
    const [id, token] = auth.split('-');
    if(token === 'secretToken') {
        req.body.user= {
            id: id
        };
        next();
        return;
    }
        return res.status(403).json({
        msg:'Unauthorized user'
    }); 
    }
    
    return res.status(403).json({
        msg:'Unauthorized user'
    });
    
}

const errorMiddleware = function (req, res, next, err) {
    console.log("Inside error middleware");
    return res.status(err.statusCode || 500).json({
        'data': err
    }
    );
}
module.exports = {
    isLoggedIn,
    errorMiddleware
}