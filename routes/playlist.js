const express = require('express');
const { createPlaylist, getPlaylistById, getPlaylistByArtistId, addSongToPlaylist, getMyPlaylist } = require('../controllers/playlist');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router()

router.post("/create/playlist",isAuthenticated,createPlaylist)
router.get("/getplaylist/:playlistId",isAuthenticated,getPlaylistById)
router.get("/getplaylistbyArtistId/:artistId",isAuthenticated,getPlaylistByArtistId)
router.post("/add/song",isAuthenticated,addSongToPlaylist);
router.get("/getmyplaylist",isAuthenticated,getMyPlaylist)


module.exports = router;