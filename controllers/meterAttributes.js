const { Meter_attributes } = require('../models')

module.exports = {
    submitAttributes: async (req, res) => {
        try {

            let { meter_name, building_name, model_start, model_end, analysis_start, analysis_end, meter_description, base_temp,
                auto_ignored, slope, intercept, r_squared, std_dev } = req.body
            
            const findAttributes = await Meter_attributes.findAll({
                where: {
                    meter_name,
                    building_name,
                    model_start,
                    model_end,
                    analysis_start,
                    analysis_end,
                    meter_description,
                    base_temp,
                    auto_ignored,
                    slope,
                    intercept,
                    r_squared,
                    std_dev,
                }
            })
            
           console.log(findAttributes)

            const attributes = await Meter_attributes.create({
                meter_name, building_name, model_start, model_end, analysis_start, analysis_end, meter_description, base_temp,
                auto_ignored, slope, intercept, r_squared, std_dev
            })

            return res.json(attributes)

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    }
}