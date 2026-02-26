require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopsmart');
        console.log('MongoDB Connected');

        // Check if admin exists
        let admin = await User.findOne({ email: 'admin@shopsmart.com' });

        if (admin) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        // Create new admin user
        admin = new User({
            username: 'Admin',
            email: 'admin@shopsmart.com',
            phone: '0000000000',
            password: 'adminpassword123',
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully!');
        console.log('Email: admin@shopsmart.com');
        console.log('Password: adminpassword123');

        process.exit(0);
    } catch (error) {
        console.error('Error with admin seed', error);
        process.exit(1);
    }
};

seedAdmin();
