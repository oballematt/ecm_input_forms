// const { Bldg_metadata, Model_api_authorization } = require('../models');


// module.exports = {
    
//     getBuildings: async (req, res) => {

//         try {
        
//             const buildings = await Bldg_metadata.findAll({

//                 order: [
//                     ['building', 'ASC']
//                 ]
//             })

//             return res.json(buildings)

//         } catch (error) {
//             console.error(error.message)
//         }
//     },

//     getBuildingsBySteward: async (req, res) => {

//         const { steward } = req.body

//         try {

//             if (steward === 'All') {
//                 const buildings = await Bldg_metadata.findAll({
//                     order: [
//                         ['building', 'ASC']
//                     ]
//                 })

//                 return res.json(buildings)
//             } else {

//                 const buildings = await Bldg_metadata.findAll({
//                     where: { steward },
//                     order: [
//                         ['building', 'ASC']
//                     ]
//                 })
//                 return res.json(buildings)
//             }
//         } catch (error) {
//             console.error(error.message)
//         }

//     }
// }