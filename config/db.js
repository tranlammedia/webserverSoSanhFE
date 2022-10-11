const mongoose = require('mongoose')
const { MONGODB } = require('.')

const connectDB = () => {
    mongoose
      .connect(MONGODB)
      .then(()=> {
        console.log("connect to DB")
      })
      .catch((err) => console.log("Can not connect to DB"))
}

module.exports = connectDB