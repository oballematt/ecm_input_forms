const { Bldg_metadata } = require('../models');

module.exports = {
    buildingsBySteward: async (req, res) => {
        const { steward } = req.body;
        let errors = []
        try {

            if (steward.includes('hello')) {
                errors.push({ text: 'Invalid Entry' })
            }

            if (errors.length > 0) {
                return res.render('cleaning', {
                    errors
                })
            } else {

                const findBuilding = await Bldg_metadata.findAll({
                    where: {
                        steward
                    },
                    order: [
                        ['building', 'ASC']
                    ]
                })

                return res.json(findBuilding)
            }


        } catch (error) {
            console.error(error.message)
        }

    }
}