import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createAt: { type: Date, default: Date.now() },
});
export default mongoose.model("users", UserSchema);
