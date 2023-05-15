import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: false },
    currentPosition: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
        countryCode: { type: String, required: false },
        city: { type: String, required: false },
    },
    password: { type: String, required: true },
    createAt: { type: Date, default: Date.now() },
});
export default mongoose.model("users", UserSchema);
