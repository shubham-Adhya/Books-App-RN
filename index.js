const express = require("express");
const cors = require("cors");
const { connection } = require('./configs/connection');
require('dotenv').config();

const { Bookmodel } = require("./model/books.model")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Working fine")
})
app.post("/newbook", async (req, res) => {
    const payload = req.body;
    try {
        await Bookmodel.create(payload);
        res.status(201).json({ message: "New Book entry created" })
    } catch (error) {
        console.log(error)
    }
})
app.get("/allbooks", async (req, res) => {
    try {
        const books = await Bookmodel.find({});
        res.status(200).json({ message: "All books", books })
    } catch (error) {
        console.log(error)
    }
})
app.delete("/deletebook/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        await Bookmodel.findByIdAndDelete(id)
        const books = await Bookmodel.find({});

        res.status(200).json({ message: "Book Deleted" ,books })

    } catch (error) {
        console.log(error)
    }
})
app.get("/sort", async (req, res) => {
    try {
        const { _price } = req.query;
        if (_price==='asc'){
            const books = await Bookmodel.find({}).sort({price: 1});
            res.status(200).json({ message: "Books Sorted in ascending order" ,books })
        } else if (_price === 'desc'){
            const books = await Bookmodel.find({}).sort({ price: -1 });
            res.status(200).json({ message: "Books Sorted in descending order", books })
        }else{
            res.status(500).json({message: "Something went wrong"})
        }

    } catch (error) {
        console.log(error)
    }
})
app.get("/filter", async (req, res) => {
    try {
        const { _genre } = req.query;
        if (_genre){
            const books = await Bookmodel.find({genre: _genre})
            res.status(200).json({ message: "Books Filtered" ,books })
        }else{
            res.status(500).json({message: "Something went wrong"})
        }

    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT, async () => {
    try {
        await connection
            .then(() => {
                console.log("Connected to MongoDB")
                console.log(`Server is running at port ${process.env.PORT}`)
            })
            .catch(() => {
                console.log("Something went Wrong")
            })
    } catch (error) {
        console.log(error)
    }
})