const mongoose= require("mongoose");

const booksSchema=mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number
},{
    timestamps: true,
    versionKey: false
})

const Bookmodel=mongoose.model("book",booksSchema)

module.exports={Bookmodel}
