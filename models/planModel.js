import mongoose from "mongoose";

const planModel = new mongoose.Schema({
    store_location: {
        type: String,
        required: true,
        unique: true
    },
    valid_from: {
        type: String,
        require: true
    },
    valid_to: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
}, {
    timestamps: true,
    collection: 'plan'
})

const Plan = new mongoose.model('Plan', planModel);

export default Plan;