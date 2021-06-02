const { Prjt_costs_hours } = require('../models');

module.exports = {

    // Add costs and hours to database
    createCostsHours: async (req, res) => {


        const { project_id, imp_or_ann, category, cost, hours } = req.body;

        try {
            const costHours = await Prjt_costs_hours.create({
                project_id, imp_or_ann, category, cost, hours,
            });

            return res.redirect('/find')


        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    },

    // Renders the form to add data to costs_hours table onto the /costs_hours route
    getForm: (req, res) => {
        return res.render('create/cost_hours')
    },

    getOneCostsHours: async (req, res) => {
        const { id } = req.params

        try {

            const costHours = await Prjt_costs_hours.findOne({
                where: {
                    id
                }
            });

            return res.render('edit/editCostsHours', {
                costHours
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateCostsHours: async (req, res) => {
        try {

            const { imp_or_ann, category, cost, hours } = req.body;
            const { id } = req.params

            const costHours = await Prjt_costs_hours.update({
                imp_or_ann, category, cost, hours
            },
                {
                    where: {
                        id
                    }
                });

            return res.redirect('/find')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    getOneByProjectId: async (req, res) => {
        const { project_id } = req.params

        try {

            const costHours = await Prjt_costs_hours.findOne({
                where: {
                    project_id
                }
            });

            return res.render('add/addCostsHours', {
                costHours
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    deleteCostsHours: async (req, res) => {
        const { id } = req.params;

        try {
            const costHours = await Prjt_costs_hours.destroy({
                where: {
                    id
                }
            });

            return res.redirect('/find')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    },

}