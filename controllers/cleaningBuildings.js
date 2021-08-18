const {  Bldg_metadata } = require('../models');

module.exports = {
    buildingsBySteward: async (req, res) => {
        const { steward } = req.body;
        try {

            const findBuilding = await Bldg_metadata.findAll({
                where: {
                    steward
                },
                order: [
                    ['building', 'ASC']
                ]
            })

            return res.json(findBuilding)
            
            
        } catch (error) {
            console.error(error.message)
        }
        
    }
}