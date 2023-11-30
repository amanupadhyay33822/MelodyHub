const express = require('express');
const cors = require('cors');
const { connect } = require("./config/database")
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const port = 3000 || process.env.PORT
connect()



// app.use(cors(corsOptions));
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());




app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:5173']; // Add more origins as needed
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials
    })
);
// app.use(cookieParser());
const user = require("./routes/auth");
const song = require("./routes/song");
const playlist = require("./routes/playlist");
app.use("/api/v1",user)
app.use("/api/v1",song)
app.use("/api/v1",playlist)

app.listen(port, ()=> {
    console.log(`listening on ${port}`)
})