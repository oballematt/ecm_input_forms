const { Prjt_costs_hours, Prjt_metadata } = require('../../models');

module.exports = {

    // Add costs and hours to database

    createCostsHours: async (req, res) => {

        let { project_id, imp_or_ann, category, cost, hours } = req.body;


        try {

            const costHours = await Prjt_costs_hours.create({
               project_id, imp_or_ann, category, cost, hours,
            });

            return res.json(costHours)


        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    },

    getOneCostsHours: async (req, res) => {
        const { id } = req.params

        try {

            const costHours = await Prjt_costs_hours.findOne({
                where: {
                    id
                }
            });

            return res.render('ecmForms/edit/editCostsHours', {
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

            return res.redirect('/ecmforms')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    deleteCostsHours: async (req, res) => {
        const { id } = req.params;

        try {

            const costHours = await Prjt_costs_hours.destroy({
                where: {
                    id
                }
            });

            res.json("Deleted")

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    },

}