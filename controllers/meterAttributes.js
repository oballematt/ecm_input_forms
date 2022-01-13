const { Meter_olsr_model } = require('../models')

module.exports = {
    getAttributes: async (req, res) => {
        try {

            let { meter } = req.body

            const findAttributes = await Meter_olsr_model.findAll({
                where: {
                    meter,
                 
                }
            })

            return res.json(findAttributes)

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    submitAttributes: async (req, res) => {
        try {

            let { meter, building_number, train_start, train_end, x, base_temperature,
                commodity_tag, auto_ignored_percentage, slope, intercept, r2, std } = req.body

            const attributes = await Meter_attributes.create({
                meter, building_number, train_start, train_end, x, base_temperature,
                commodity_tag, auto_ignored_percentage, slope, intercept, r2, std
            })

            return res.json(attributes)

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    // updateAttributes: async (req, res) => {

    //     try {

    //         let { base_temperature, auto_ignored_percentage, slope, intercept, r2, std, train_start, train_end } = req.body
    //         const { id } = req.params

    //         const update = await Meter_attributes.update({
    //             base_temperature, auto_ignored_percentage, slope, intercept, r2, std, train_start, train_end
    //         }, {
    //             where: { id }
    //         })

    //     } catch (error) {

    //         console.error(error.message);
    //         return res.status(500).json(error);

    //     }
    // }
}