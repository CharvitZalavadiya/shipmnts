import Plan from "../models/planModel.js";
import Store from "../models/storeModel.js";

export const createPlan = async (req, res) => {

    try {
        const { store_location, valid_from, valid_to, items } = req.body

        if (!store_location || !valid_from || !valid_to || !items) {
            res.status(400).json({
                success: false,
                message: 'Please enter all the details'
            })
        }

        const existingStore = await Store.findOne({ store_location: store_location })

        if (!existingStore) {
            res.status(404).json({
                success: false,
                message: 'There is no store in location you entered'
            })
        }

        const planData = {
            store_location: store_location,
            valid_from: valid_from,
            valid_to: valid_to,
            items: items
        }

        const newPlan = new Plan(planData);
        await newPlan.save();

        const newPlanFind = await Plan.findOne({ store_location: store_location })

        res.status(201).json({
            success: true,
            plan_id: newPlanFind._id,
            store_location: newPlanFind.store_location,
            message: 'Plan Created Successfully',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error creating plan ${error}`
        })
    }
}

export const getPlan = async (req, res) => {
    try {
        const { plan_id } = req.params;

        if (!plan_id) {
            res.status(400).json({
                success: false,
                message: 'Please provide the plan_id'
            })
        }

        const findPlan = await Plan.findOne({ _id: plan_id });

        if (!findPlan) {
            res.status(404).json({
                success: false,
                message: 'Plan not found'
            })
        }

        res.status(200).json({
            success: true,
            plan: findPlan
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Unable to find the plan : ${error}`
        })
    }
}

export const calculatePrice = async (req, res) => {
    try {
        const { store_location, order_date, length, selections, extras } = req.body

        if (!store_location || !order_date) {
            res.status(400).json({
                success: false,
                message: 'Please enter the store location and order date'
            })
        }

        const existingStore = await Store.findOne({ store_location: store_location })
        const existingPlan = await Plan.findOne({ store_location: store_location })

        if (!existingPlan || !existingStore) {
            res.status(404).json({
                success: false,
                message: `Your entered store or plan not found`
            })
        }

        let total_before_tax = 0;
        const tax_percentage = existingStore.tax_percentage;
        let total_after_tax = 0;

        let items = [];

        for (const [key, value] of Object.entries(selections)) {
            // console.log(key)
            existingPlan.items.map((planitem) => {

                value.map((item) => {
                    if (item === planitem.name) {
                        // business logic for calculing price
                        
                        total_before_tax += planitem.full_price;
                        items.push({name: item, rate: planitem.full_price})
                    }
                })
            })

            total_after_tax += total_before_tax + ((total_before_tax * tax_percentage) / 100);

        }

        const responseData = {
            store_location: existingStore.store_location,
            currency: existingStore.currency,
            length: length,
            items: items,
            total_before_tax: total_before_tax,
            tax_percentage: tax_percentage,
            total_after_tax: total_after_tax,
        }

        res.status(200).json({
            success: true,
            response:responseData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to calculate : ${calculatePrice}`
        })
    }
}

export default {
    createPlan,
    getPlan,
    calculatePrice
}