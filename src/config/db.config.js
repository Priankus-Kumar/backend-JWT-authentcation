const { default: mongoose } = require("mongoose")
require("dotenv").config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB is connected")
    } catch (error) {
        console.log("db is not connected",error)
    }
}

module.exports=connectDB