const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

// Sentences SQL
const _getAll = "SELECT * FROM user_info";
const _getById = "SELECT * FROM user_info where id = $1";
const insertUser =
    "INSERT INTO user_info (username, email, password, full_name, date_of_birth, gender, nationality, description) VALUES ($1 ,$2 ,$3 , $4, $5, $6, $7, $8) RETURNING *";

const getAll = async (req, res) => {
    try {
        await pool.query("SELECT * FROM user_info", (error, result) => {
            res.json(result.rows);
        });
    } catch (error) {
        res.json({error: error.message});
    }
};

const getById = async (req, res) => {
    const {id} = req.params;
    try {
        await pool.query("SELECT * FROM user_info WHERE id = $1", [id], (error, result) => {
            if (result.rows.length === 0) {
                return res.status(404).json({message: "User not exits!!"});
            }
            res.json(result.rows[0]);
        });
    } catch (error) {
        console.log(error.message);
    }
};

const createUser = async (req, res) => {
    const {username, email, password, full_name, date_of_birth, gender, nationality, description} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        let newUser = await pool.query(insertUser, [
            username,
            email,
            bcryptPassword,
            full_name,
            date_of_birth,
            gender,
            nationality,
            description,
        ]);

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        return res.json({jwtToken});
    } catch (error) {
        console.error(error.message);
        res.status(400).json(`this ${username} already exist!`);
    }
};

const sign_in = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
};

module.exports = {
    getAll,
    getById,
    createUser,
    sign_in,
};
