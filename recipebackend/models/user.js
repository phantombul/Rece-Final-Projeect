import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    id: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favourites: [String],
    allergies: [String]
});

export default mongoose.model('user', staffSchema);
