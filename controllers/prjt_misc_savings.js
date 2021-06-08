const { Prjt_misc_savings, Prjt_metadata } = require('../models');

module.exports = {

    createMiscSavings: async (req, res) => {
        let { project_id, phase, misc_owner, misc_savings } = req.body;

        let errors = []

        try {

            const miscSavings = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            if (!phase) {
                errors.push({ text: "please select an option for phase" })
            };

            if (!misc_owner) {
                errors.push({ text: "please select an option for owner" })
            };

            if (!misc_savings) {
                errors.push({ text: "please enter a value for savings field " })
            };

            if (errors.length > 0) {
                res.render('add/addMiscSavings', {
                    errors, phase, misc_owner, misc_savings, miscSavings
                })

            } else {

                const miscSavings = await Prjt_misc_savings.create({
                    project_id, phase, misc_owner, misc_savings
                });

                return res.redirect('/find');
            }

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    },

    // getForm: async (req, res) => {
    //     return res.render('create/miscSavings')
    // },

    getOneMiscSavings: async (req, res) => {
        const { id } = req.params

        try {

            const miscSavings = await Prjt_misc_savings.findOne({
                where: {
                    id
                }
            });

            return res.render('edit/editMiscSavings', {
                miscSavings
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateMiscSavings: async (req, res) => {
        try {

            const { phase, misc_owner, misc_savings } = req.body;
            const { id } = req.params

            const miscSavings = await Prjt_misc_savings.update({
                phase, misc_owner, misc_savings
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

            const miscSavings = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            return res.render('add/addMiscSavings', {
                miscSavings
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    deleteMiscSavings: async (req, res) => {
        const { id } = req.params;

        try {
            await Prjt_misc_savings.destroy({
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