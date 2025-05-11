const fs = require('fs');
const mongoose = require('mongoose');

const Tour = require('./../../modules/tourModule')
const Review = require('./../../modules/reviewModel')
const User = require('./../../modules/userModule')
const dotenv =require('dotenv');
dotenv.config({ path: './config.env'});


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect( DB , {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
   // useFindAndModfiy:false
}).then( 
    console.log('DB connection is successful'))

    const tours = JSON.parse( fs.readFileSync(`${__dirname}/tours.json`, 'utf8'));
    const users = JSON.parse( fs.readFileSync(`${__dirname}/users.json`, 'utf8'));
    const reviews = JSON.parse( fs.readFileSync(`${__dirname}/reviews.json`, 'utf8'));

    const importData = async () => {
        try {
            await Tour.create(tours);
            await Review.create(reviews);
            await User.create(users , {ValidityBeforeSave: false});
            console.log('Data successfully')
        }catch(err) {
            console.log(err);
        }
        process.exit();
        };
    
        const deleteData = async () => {
            try{
                await Tour.deleteMany();
                await Review.deleteMany();
                await User.deleteMany();
                console.log('Data Deleted success');
            } catch(err) {
                console.log(err);
            }
            process.exit();
        };
        if (process.argv[2] === '--import' ){
            importData();
        } else if (process.argv[2] === '--delete'){
            deleteData();
        }
    