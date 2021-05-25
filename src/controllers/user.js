const express = require('express');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const getAllUsers = (req, res) => {

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
    res.json(users);
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const createUser = (req, res) => {
    const user = req.body;
    user.id = 1;
    const result = { message: "User created", user };
    res.status(201).json(result);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const updateUser = (req, res) => {
    const { id } = req.params.id;
    const user = req.body;

    user.id = id

    const result = { message: "User update with put", user };
    res.json(result);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const updatePartialUser = (req, res) => {
    const {id} = req.params.id
    const user = req.body;

    user.name = "Facundo"
    user.id = id

    const result = {message: 'User update with patch'}
    res.json(result)
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const deleteUser = (req, res) => {
    const { id } = req.params;
    const result = {message: `User with id ${id} delete`}
    res.json(result)
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser,
};