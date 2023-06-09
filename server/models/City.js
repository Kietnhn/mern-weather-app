import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CitiSchema = Schema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});
export default mongoose.model("cities", CitiSchema);
