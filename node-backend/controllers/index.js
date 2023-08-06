function getHello (request, response) {
    return response.send('Hello from server');
}

function getName(request, response) {
    console.log("Request from, getName", request.query);
    return response.status(200).json({
        msg: `Name is ${request.query.name}`,
        data: request.query
    });
}

function getPosts (request, response) {
    const posts = [
        {
            id: 1,
            content: 'My First post'
        },
        {
            id: 1,
            content: 'My second post'
        },
    ]
    return response.status(200).json({
        posts: posts
    });
}

function getNameFromPath(request, response) {
    console.log("Request from,getNameFromPath ", request.params.name);
    return response.status(200).json({
        msg: `Name is ${request.params.name}`,
        data: request.params
    });
}

let user = null;

function registerUser(req, res) {

    // Details of user should be send by client to server
    // name
    // email
    // password
    // confirm password
    console.log("Response from register", req.body);

    user = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    };

    return res.status(200).json({
        msg: `User register successfully`,
        data: { user}
    });
}




function updateUser (req, res) {
    const {name, password, email} = req.body;
    user = {
        name: name,
        password: password,
        email: email
    };

    return res.status(200).json({
        msg: "User updated successfully",
        data: {user}
    })
}

function patchUser(req, res) {
    const {name, email, password} = req.body;

    if(name) {
        user.name = name;
    }

    if(email) {
        user.email = email;
    }

    if(password) {
        user.password = password;
    }

    return res.status(200).json({
        msg: "User updated successfully",
        data: {user}
    })
}

function deleteUser  (req, res) {
    user = null;
    return res.status(200).json({
        msg: "User deleted successfully"
    });
}

function getUser (req, res) {
    return res.status(200).json({
        msg: "User fetched successfully",
        data: {user}
    })
}

// We are adding getHello Function inside module exports object
module.exports = {
    getHello: getHello,
    getName,
    getPosts,
    getNameFromPath,
    registerUser,
    updateUser,
    patchUser,
    deleteUser,
    getUser
};

