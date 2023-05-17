import mongoose from "mongoose"; // mongo db

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        require: "This field is required",
    },
    description:{
        type: String,
        require: true,
    },
    category:{
        type: Array,
        require: true,
    }
})

export default mongoose.model('Movie',movieSchema);






