const { Prjt_savings, Prjt_metadata } = require('../models');

module.exports = {

    createSavings: async (req, res) => {
        let { project_id, phase, commodity, value } = req.body;

        let errors = []

        try {

            const savings = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            if (!phase) {
                errors.push({ text: "please select an option for phase" })
            };

            if (!commodity) {
                errors.push({ text: "please select an option for commodity" })
            };

            if (!value) {
                errors.push({ text: "please enter a value for value field " })
            };

            if (errors.length > 0) {
                res.render('add/addSavings', {
                    errors, phase, commodity, value, savings
                })

            } else {

                const savings = await Prjt_savings.create({
                    project_id, phase, commodity, value
                });

                return res.redirect('/find');
            }

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    },

    getForm: async (req, res) => {
        return res.render('create/savings')
    },

    getOneSavings: async (req, res) => {
        const { id } = req.params

        try {

            const savings = await Prjt_savings.findOne({
                where: {
                    id
                }
            });

            return res.render('edit/editSavings', {
                savings
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateSavings: async (req, res) => {
        try {

            const { phase, commodity, value } = req.body;
            const { id } = req.params

            const savings = await Prjt_savings.update({
                phase, commodity, value
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

            const savings = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            return res.render('add/addSavings', {
                savings
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    deleteSavings: async (req, res) => {
        const { id } = req.params;

        try {
            await Prjt_savings.destroy({
                where: {
                    id
                }
            });

            return res.redirect('/find')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    }
}