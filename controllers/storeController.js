import Store from "../models/storeModel.js";

export const createStore = async (req, res) => {

    try {
        const { store_location, currency, tax_percentage, premium_items } = req.body

        if (!store_location || !currency || !tax_percentage || !premium_items) {
            res.status(400).json({
                success: false,
                message: 'Please enter all the details'
            })
        }

        const existingStore = await Store.findOne({ store_location: store_location })

        if (existingStore) {
            res.status(409).json({
                success: false,
                message: 'Store with this location already exists'
            })
        }

        const storeData = {
            store_location: store_location,
            currency: currency,
            tax_percentage: tax_percentage,
            premium_items: premium_items
        }

        const newStore = new Store(storeData);
        await newStore.save();

        res.status(201).json({
            success: true,
            message: 'Store Created Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error creating store ${error}`
        })
    }

}

export const updateStore = async (req, res) => {

    try {
        const { currency, tax_percentage, premium_items } = req.body
        const { store_location } = req.params

        const existingStore = await Store.findOne({ store_location: store_location })

        if (!existingStore) {
            res.status(404).json({
                success: false,
                message: 'Store with this location does not exists'
            })
        }

        const storeData = {
            currency: currency,
            tax_percentage: tax_percentage,
            premium_items: premium_items
        }

        await Store.updateOne(
            { store_location: store_location },
            {
                $set: {
                    currency: currency,
                    tax_percentage: tax_percentage,
                    premium_items: premium_items
                }
            })

        res.status(200).json({
            success: true,
            message: 'Store Updated Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update the store'
        })
    }
}

export default {
    createStore,
    updateStore
}