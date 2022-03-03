const { Meter_olsr_model } = require('../../models')

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

}