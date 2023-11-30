


const express = require('express');
const app = express();
const { isAuthenticated } = require('../middleware/auth');
const { createSong, getMySongs, getSongsByArtist, getSongsByName, likeSong } = require('../controllers/song');
const router = express.Router()
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
router.post("/create/song",isAuthenticated,createSong)
router.get("/getmysong",isAuthenticated,getMySongs)
router.get("/getsongbyArtist/:id",isAuthenticated,getSongsByArtist)
router.get("/get/song/:name",isAuthenticated,getSongsByName)
router.post("/like/song",isAuthenticated,likeSong);



module.exports = router;
