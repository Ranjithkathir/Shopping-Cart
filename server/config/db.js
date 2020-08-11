const mongoose = require('mongoose');
const dotenv = require('dotenv');
import config from './default';

dotenv.config();

const mongodburl = config.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongodburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log('DB Connected....');
    } catch (err) {
        console.log(err);
        // exit with connection faiure
        process.exit(1);
    }
};

module.exports = connectDB;