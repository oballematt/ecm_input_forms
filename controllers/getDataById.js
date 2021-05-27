const { Prjt_metadata, Prjt_costs_hours, Prjt_baseline, Prjt_funding, Prjt_savings } = require('../models');

module.exports = {
    findData: async (req, res) => {
        try {
            const { project_id } = req.body

            const metadata = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            const costsHours = await Prjt_costs_hours.findAll({
                where: {
                    project_id
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            const baseline = await Prjt_baseline.findAll({
                where: {
                    project_id
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            const funding = await Prjt_funding.findAll({
                where: {
                    project_id
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            const savings = await Prjt_savings.findAll({
                where: {
                    project_id
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            return res.render('allForms', {
                metadata,
                costsHours,
                baseline,
                funding,
                savings
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);
        };

    },

    
}