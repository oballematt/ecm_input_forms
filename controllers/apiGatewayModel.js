require('dotenv').config();
const { Model_api_authorization } = require('../models')
const axios = require('axios').default;
module.exports = {

    getModel: async (req, res) => {

        const { buildingNumber, commodity, meter, trainStart, trainEnd, analysisStart, analysisEnd } = req.query
        const email = req.user.email

        try {

            const token = await Model_api_authorization.findOne({
                where: {
                    email: email
                },
                attributes: ['token']
            })

            const config = {
                headers: {
                    'authorizationToken': token.token
                }
            }
            const model = process.env.GET_API_URL + `building_number=${buildingNumber}&commodity_tag=${commodity}&meter=${meter}&train_start=${trainStart}&train_end=${trainEnd}&analysis_start=${analysisStart}&analysis_end=${analysisEnd}`
            const response = await axios.get(model, config)
            console.log(token.token)
            return res.json(response.data)

        } catch (error) {
            console.error(error.message)
            return res.json(error)
        }
    },

    postModel: async (req, res) => {

        const { analyst, building_number, commodity_tag, meter, timestamp, values, reason, notes } = req.body
        const email = req.user.email

        try {
            const token = await Model_api_authorization.findOne({
                where: {
                    email: email
                },
                attributes: ['token']
            })


            const headers = {
                'Content-Type': 'application/json',
                'authorizationToken': token.token
            }


            const data = JSON.stringify({
                'analyst': analyst,
                'building_number': building_number,
                'commodity_tag': commodity_tag,
                'meter': meter,
                'data': {
                    'timestamp': timestamp,
                    'value': values,
                    'reason': reason,
                    'notes': notes
                }
            })

            const postModel = process.env.POST_API_URL

            const response = await axios.post(postModel, data, {
                headers: headers
            })
            console.log(token.token)

            return res.json(response.data)

        } catch (error) {
            console.error(error)
            return res.json(error)
        }



    }
}
