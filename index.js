const express  = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
    res.send("Hello, World!");
});

app.post("/createCake", (req, res) => {
    console.log("BODY:", req.body);


    res.status(201).send();
});

app.get("/getAllCakes", (req, res) => {
    res.send();
});

app.get("/getCake/:id", (req, res) => {
    console.log("PARAMS", req.params);

    res.send();
});

app.patch("/updateCake", (req, res) => {
    console.log("QUERY:", req.query);

    res.send();
});


app.delete("/removeCake/:id", (req, res) => {
    console.log("PARAMS:", req.params);

    res.send();
})

const server = app.listen(4494, () => {
    console.log(`Server started on port ${server.address().port}`);
});