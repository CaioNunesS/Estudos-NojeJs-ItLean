import mongoose from "mongoose"; // mongo db

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        require: "This field is required",
    },
    studentClass:{
        type: String,
        require: "This field is required",
    },
    endnote:{
        type: Number,
        require: "This field is required",
    }
})

export default mongoose.model('registerStudent', movieSchema);






