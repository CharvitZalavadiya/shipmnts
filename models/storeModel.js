import mongoose from "mongoose";

const storeModel = new mongoose.Schema({
    store_location: {
        type: String,
        required: true,
        unique: true
    },
    currency: {
        type: String,
        required: true
    },
    tax_percentage: {
        type: Number,
        required: true
    },
    premium_items: {
        type: Array,
        required: true
    }
}, {
    timestamps: true,
    collection: 'store'
})

const Store = new mongoose.model('Store', storeModel);

export default Store;