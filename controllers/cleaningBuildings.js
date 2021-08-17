const {  Bldg_metadata } = require('../models');

module.exports = {
    buildingsBySteward: async (req, res) => {
        const { steward } = req.body;
        try {

            const findBuilding = await Bldg_metadata.findAll({
                where: {
                    steward
                }
            })

            return res.render('cleaning',{
                layout: 'datacleaning', 
                findBuilding
            })
            
        } catch (error) {
            console.error(error.message)
        }
        
    }
}