const express = require("express");
const app = express();
require("dotenv").config;
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Emanuel",
        },
        {
            id: 2,
            name: "Lucas",
        },
    ];
    res.json(users)
});

app.post("/users",  (req, res) => {
    const user = req.body;
    user.id = 1;
    const result = {message: 'User created', user}
    res.status(201).json(result);
});

app.put("/users/:id", (req, res) => {
    const {id} = req.params.id
    const user = req.body;

    user.name = "Facundo"
    user.id = id

    const result = { message: "User update with put", user };
    res.json(result);
});

app.patch("/users/:id",  (req, res) => {
    const {id} = req.params.id
    const user = req.body;

    user.name = "Facundo"
    user.id = id

    const result = {message: 'User update with patch'}
    res.json(result)
});

app.delete("/users/:id",  (req, res) => {
    const { id } = req.params;
    const result = {message: `User with id ${id} delete`}
    res.json(result)
});

app.listen(port, () => {
    console.log(`##### App started. Port: ${port} #####`);
});
