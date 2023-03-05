const pool = require("../db");
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");
const jwtGenerator = require("../utils/jwtGenerator");

// Sentences SQL
const _getAll =
    "select user_info.id, user_info.username ,user_info.nationality ,languages.language_name ,language_level.levels " +
    "from user_info " +
    "join languages on user_info.language  = languages.id " +
    "join language_level on user_info.language_level = language_level.id;";

const _getById =
    "select user_info.id, user_info.email, user_info.password, user_info.full_name, user_info.date_of_birth, user_info.gender, user_info.nationality, languages.language_name, language_level.levels, user_info.description " +
    "from user_info " +
    "join languages on user_info.language = languages.id " +
    "join language_level on user_info.language_level  = language_level.id WHERE user_info.id = $1;";

const insertUser =
    "INSERT INTO user_info (username, email, password, full_name, date_of_birth, gender, nationality, description) VALUES ($1 ,$2 ,$3 , $4, $5, $6, $7, $8) RETURNING *";

const getAll = async (req, res) => {
    try {
        await pool.query(_getAll, (error, result) => {
            res.json(result.rows);
        });
    } catch (error) {
        res.json({error: error.message});
    }
};

const getById = async (req, res) => {
    const {id} = req.params;
    try {
        await pool.query(_getById, [id], (error, result) => {
            if (result.rows.length === 0) {
                return res.status(404).json({message: "User not exits!!"});
            }
            res.json(result.rows[0]);
        });
    } catch (error) {
        console.log(error.message);
    }
};

const register = async (req, res) => {
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

        const jwtToken = jwtGenerator(newUser.rows[0].id);
        return res.status(201).send({jwtToken: jwtToken, isAuthenticated: true});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: error.message, message: `this ${username} already exist!`});
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await pool.query("SELECT * FROM user_info WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({error: "Invalid Credential", isAuthenticated: false});
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json({error: "Invalid Credential", isAuthenticated: false});
        }
        const jwtToken = jwtGenerator(user.rows[0].id);

        return res.status(200).json({jwtToken, isAuthenticated: true});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

// user authorization
// const authorize =  (req, res) => {
//     console.log("ds");
//     try {
//         res.status(200).send({isAuthenticated: true});
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({error: error.message, isAuthenticated: false});
//     }
// };

module.exports = {
    getAll,
    getById,
    register,
    login,
    //authorize,
};
