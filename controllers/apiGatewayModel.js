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


            const postdata = JSON.stringify({
                'analyst': analyst,
                'building_number': building_number,
                'commodity_tag': commodity_tag,
                'meter': meter,
                'data': {
                    'timestamp': JSON.parse(timestamp),
                    'value': JSON.parse(values),
                    'reason': JSON.parse(reason),
                    'notes': JSON.parse(notes)
                }
            })

            const postModel = process.env.POST_API_URL

            const response = await axios.post(postModel, postdata, {
                headers: headers
            })

            return res.json(response.data)

        } catch (error) {
            console.error(error.message)
            return res.json(error)
        }



    },

    postAttributes: async (req, res) => {
        const email = req.user.email
        const { building_number, meter, commodity_tag, train_start, train_end, x,
            auto_ignored_percentage, base_temperature, r2, slope, intercept, std } = req.body

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

            const attrdata = JSON.stringify({
                'building_number': building_number,
                'meter': meter,
                'commodity_tag': commodity_tag,
                'train_start': train_start,
                'train_end': train_end,
                'x': x,
                'auto_ignored_percentage': Number(auto_ignored_percentage),
                'base_temperature': Number(base_temperature),
                'r2': Number(r2),
                'slope': Number(slope),
                'intercept': Number(intercept),
                'std': Number(std)
            })
            const postattributes = process.env.ATTR_POST_API

            const response = await axios.post(postattributes, attrdata, {
                headers: headers

            })

            return res.json(response.data)


        } catch (error) {

            console.error(error)
            return res.json(error)

        }
    }
}
