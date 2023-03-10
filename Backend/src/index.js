// Requires
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();


var corsOptions = {
    origin: "http://localhost:8081"
  };
  
// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.use("/auth", routes);
//app.use(routes);

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to language buddy Migracode!!!."});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
