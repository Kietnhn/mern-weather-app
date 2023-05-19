import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    country: { type: String, required: false },
    city: { type: String, required: false },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});
export default mongoose.model("positions", PositionSchema);
