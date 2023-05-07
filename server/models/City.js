import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CitiSchema = Schema({
    lat: { type: String, required: true },
    lon: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});
export default mongoose.model("cities", CitiSchema);
