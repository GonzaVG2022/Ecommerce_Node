const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@gmail.com',
            password: 'test',
            phone: '+1235478'
        })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();
