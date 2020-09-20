const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
require('dotenv').config();


const mongoURI = process.env.MONGODB_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user: "bizapp",
        password: "P@ssw0rd"
    }
}

const mongodb = async () => {
    await mongoose.connect(mongoURI, options)
       .then(() => {
           console.log('MongoDB: Connection successful!!');
           return true;
       })
       .catch((error) => {
           console.log('MongoDB: Connection failed!!');
           console.log('ERROR: Please start mongodb first and restart again');
           process.exit(0);
       });
}

module.exports = mongodb;