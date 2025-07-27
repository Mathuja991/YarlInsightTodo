const mongoose =require("mongoose");

const connectToDb =async () => {
    try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database Connected")
    } catch ( error ) {
    console.error("DB connection failed")
    }
};
module.exports = connectToDb;