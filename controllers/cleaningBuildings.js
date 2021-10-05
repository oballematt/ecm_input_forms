const { Bldg_metadata } = require('../models');

module.exports = {
    getBuildings: async (req, res) => {

        try {

            const buildings = await Bldg_metadata.findAll({

                order: [
                    ['building', 'ASC']
                ]
            })

            return res.render('cleaning', { layout: 'dataCleaning', buildings, email: req.user.email, name: req.user.name, })

        } catch (error) {
            console.error(error.message)
        }
    },

    getBuildingsBySteward: async (req, res) => {

        const { steward } = req.body

        try {

            const buildings = await Bldg_metadata.findAll({
                where: { steward },
                order: [
                    ['building', 'ASC']
                ]
            })
            return res.json(buildings)
        } catch (error) {
            console.error(error.message)
        }

    }
}