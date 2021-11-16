require('dotenv').config();
module.exports = {
    getModel: (req, res) => {
        const { buildingNumber, commodity, meter, trainStart, trainEnd, analysisStart, analysisEnd } = req.body
        try {

            const model = process.env.API_URL + `building_number=${buildingNumber}&commodity_tag=${commodity}&meter=${meter}&train_start=${trainStart}&train_end=${trainEnd}&analysis_start=${analysisStart}&analysis_end=${analysisEnd}`

            return res.json(model)

        } catch (error) {
            console.error(error.message)
        }
    }
}