const Song = require("../models/Song")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
require("dotenv").config();
exports.createSong = async (req, res) => {
  try {
    //fetch data
    const { name , thumbnail,track } = req.body;

    //validation
    if (!name || !thumbnail || !track) {
      return res.status(400).json({
        sucess: false,
        message: "Fill all the details ",
      });
    }

    
    const artist = req.user._id;
    const songDetails = {name, thumbnail, track,artist}
    const createSong = await Song.create(songDetails)

  
    res.status(201).json({
      sucess: true,
      createSong,
    });

  } catch (err) {
    return res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};

exports.likeSong = async (req, res) =>{
  try {
   
     const {songId}=req.body;

     const user = await User.findById(req.user._id);

      
     user.likedSong.push(songId);
     await user.save();
     return res.status(200).json({
      sucess: true,
      user,
      message: "Song Liked successfully"
     });


  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
   }
  
}

exports.getSongsByArtist = async (req, res) => {
    try {
      //fetch current user
       const artistId= req.params.id;
       const songs = await Song.find( {artist:artistId})
       

      
    

      
  
      //validation
      if (!songs) {
        return res.status(400).json({
          sucess: false,
          message: "no songs found",
        });
      }
  
      
  
    
     return res.status(201).json({
        sucess: true,
        songs,
      });
  
    } catch (err) {
      return res.status(400).json({
        sucess: false,
        message: err.message,
      });
    }
  };
  
  exports.getMySongs = async (req, res) => {
    try {
      //fetch current user
       
console.log("get my songs")
      //check logined user is artist or not 
      const songs = await Song.find({ artist:req.user._id}).populate("artist")

      
  
      //validation
      if (!songs) {
        return res.status(400).json({
          sucess: false,
          message: "no songs found",
        });
      }
  
      
  
    
     return res.status(201).json({
        sucess: true,
        songs,
      });
  
    } catch (err) {
      return res.status(400).json({
        sucess: false,
        message: err.message,
      });
    }
  };


  exports.getSongsByName = async (req, res) => {
    try {
      //fetch current user
       const Name= req.params.name;
       const songs = await Song.find({name: Name}).populate("artist");       
      
      
    

      
  
      //validation
      if (songs.length == 0) {
        return res.status(400).json({
          sucess: false,
          message: "no songs found",
        });
      }
  
      
  
    
     return res.status(201).json({
        sucess: true,
        songs,
      });
  
    } catch (err) {
      return res.status(400).json({
        sucess: false,
        message: err.message,
      });
    }
  };
