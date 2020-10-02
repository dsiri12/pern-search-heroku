require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const path = require("path");

//middleware
app.use(cors());

//app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build"));

if(process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
} 

//Routes

//params => http://localhost:5000/:id => req.params
//query parameter => https://localhost:5000/?name=henry = req.query

app.get("/users", async (req, res) => {
    try {
        const { name } = req.query;

        //first_name last_name => %{}%
        //Henry Ly => %ly%
        // || => OR SQL || => Concat

        const result = await pool.query(
            "SELECT * FROM users WHERE first_name || ' ' || last_name LIKE $1", 
            [`%${name}%`]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server has started on port ${port}`);
});