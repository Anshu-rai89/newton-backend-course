const dotEnv = require('dotenv');
dotEnv.config();
const PORT = process.env.PORT;
const {initDB} = require('./config/mongoose');
const app = require('./app');

function startApp() {
    
    // Setup Database
    initDB();

    // Start the server
    app.listen(PORT, (err)=> {
        if(err) {
            console.log('Error while starting server', err);
        }
    
        console.log("Server is Up and Running on port", PORT);
    })
}

startApp();
