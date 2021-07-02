const { Prjt_costs_hours, Prjt_metadata } = require('../models');

module.exports = {

    // Add costs and hours to database

    createByProjectId: async (req, res) => {

        let { project_id, imp_or_ann, category, cost, hours } = req.body;

        let errors = []

        try {

            const costHours = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });
            
            if (!imp_or_ann){
                errors.push({text: "please select an option for implementation or annual"})
            };

            if (!category){
                errors.push({text: "please select an option for category"})
            };

            if (!cost){
                errors.push({text: "please enter a value for cost"})
            };

            if (!hours){
                errors.push({text: "please enter a value for hours"})
            };

            if (errors.length > 0){
                 res.render('add/addCostsHours', {
                    errors, imp_or_ann, category, cost, hours, costHours
                })
            
            } else {

            const costHours = await Prjt_costs_hours.create({
               project_id, imp_or_ann, category, cost, hours,
            });

            return res.redirect('/')

        }

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

            return res.redirect('/')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    getOneByProjectId: async (req, res) => {
        const { project_id } = req.params

        try {

            const costHours = await Prjt_metadata.findOne({
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

            res.json("Deleted")

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    },

}