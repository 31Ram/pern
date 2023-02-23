// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");

// const pool = require("./db");


// const routes = require('./routes/routes.js');

// const app = express();

// app.use(express.json());
// app.use(morgan("dev"));

// app.use(routes);

// app.get("/", (req, res) => {
//   pool
//   .query("SELECT * FROM user_info")
//   .then((result) => res.json(result.rows))
//   .catch((e) => console.error(e));
//   });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'language_buddy',
    password: 'Cali',
    port: 5432
});

app.get('/', (req, res) => {
  pool.query('select * from user_info', (error, result) => {
      res.json(result.rows)
  })
})
app.listen(3000, () => console.log("Server is up and running"));