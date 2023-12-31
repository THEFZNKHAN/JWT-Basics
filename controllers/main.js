const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { BadRequestError } = require("../errors");

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError("Please provide username and password");
    }

    const id = new Date().getDate();
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: "30d" };

    const token = jwt.sign({ id, username }, secretKey, options);

    res.status(StatusCodes.OK).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(StatusCodes.OK).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
};

module.exports = { login, dashboard };
