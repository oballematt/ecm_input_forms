require('dotenv').config();
const axios = require('axios').default;
module.exports = {
    getModel: async (req, res) => {
        const { buildingNumber, commodity, meter, trainStart, trainEnd, analysisStart, analysisEnd } = req.query
        try {
            const config = {
                headers: {
                    'authorizationToken': process.env.TOKEN
                }
            }
            const model = process.env.API_URL + `building_number=${buildingNumber}&commodity_tag=${commodity}&meter=${meter}&train_start=${trainStart}&train_end=${trainEnd}&analysis_start=${analysisStart}&analysis_end=${analysisEnd}`
            const response = await axios.get(model, config)
            console.log(req.user.email)
            if (response === 'Request failed with status code 504') {
                return res.json('not wokring')
            } else {
                return res.json(response.data)
            }
            


        } catch (error) {
            console.error(error.message)
        }
    }
}
