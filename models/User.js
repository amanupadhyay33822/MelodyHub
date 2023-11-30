const mongoose = require('mongoose')    


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        
    },
    password:{
        type:String,
        private:true,
        required:true,
    
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    likedSong:[{
        type:mongoose.Types.ObjectId,
        ref:"Song"
    }],
   
    likedPlaylist:{
        type:String,
        default:""
    },
    subscribedArtist:{
        type:String,
        default:""
    },
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);