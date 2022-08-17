const express  = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const cakes = [ {
    name: "Cheesecake",
    amount: 12,
    cost: 4.45
}];

app.use((req, res, next) => {
    console.log("Never");
    return next();
})

app.use((req, res, next) => {
    console.log("gonna");
    return next();
})

app.use((req, res, next) => {
    console.log("give");
    // return next("Oops"); causes error
    return next();
})

app.use((req, res, next) => {
    console.log("you");
    return next();
})
app.use((req, res, next) => {
    console.log("up");
    return next();
})
app.use((req, res, next) => {
    console.log("!");
    return next();
})

const middleware = (req, res, next) => {
    console.log("Never gonna tuuurn around");
    return next();
}

app.get("/hello", middleware, (req, res) => {
    return res.send("Hello, World!");
});

app.post("/createCake", (req, res, next) => {
    console.log("BODY:", req.body);
    if (!req.body || Object.keys(req.body).length < 1) return next({ status: 400, message: "No body"})

    cakes.push(req.body);
    return res.status(201).send(cakes[cakes.length - 1]);
});

app.get("/getAllCakes", (req, res) => {
    return res.json(cakes);
});

app.get("/getCake/:id", (req, res, next) => {
    console.log("PARAMS", req.params);
    const {id} = req.params;
    if (id === null || id === undefined) return next({status: 400, message: "Missing id"});
    if (id < 0 || id >= cakes.length) return next({ status: 404, message: "No cake found with id: " + id})

    return res.json(cakes[id]);
});

app.patch("/updateCake/:id", (req, res) => {
    console.log("PARAMS", req.params);
    console.log("QUERY:", req.query);
    const { name, cost, amount} = req.query;
    const { id } = req.params;
    const cakeToUpdate = cakes[req.params.id];
    
    if (name) cakeToUpdate.name = cakeToUpdate.name;
    if (cost !== null && cost !== undefined) cakeToUpdate.cost = cost;
    if (amount !== null && amount !== undefined) cakeToUpdate.amount = amount;

    return res.json(cakes[id]);
});


app.delete("/removeCake/:id", (req, res) => {
    console.log("PARAMS:", req.params);
    cakes.splice(req.params.id);
    return res.status(204).send();
});

app.use("*", (req, res, next) => next({status: 404, message: "Incorrect URL"}));

app.use((err, req, res, next) => {
    return res.status(err.status || 500).send(err.message || err);
})

const server = app.listen(4494, () => {
    console.log(`Server started on port ${server.address().port}`);
});