const { Prjt_misc_savings, Prjt_metadata } = require('../models');

module.exports = {

    createMiscSavings: async (req, res) => {
        let { project_id, phase, misc_owner, misc_savings } = req.body;

        try {

            const miscSavings = await Prjt_misc_savings.create({
                project_id, phase, misc_owner, misc_savings
            });

            return res.json(miscSavings);


        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    },

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

            return res.redirect('/ecmprojectsform')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    deleteMiscSavings: async (req, res) => {
        const { id } = req.params;

        try {
            await Prjt_misc_savings.destroy({
                where: {
                    id
                }
            });

            res.json("deleted")

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    }
}