const { Prjt_savings, Prjt_metadata } = require('../models');

module.exports = {

    createSavings: async (req, res) => {
        let { project_id, phase, commodity, value } = req.body;

        try {

            const savings = await Prjt_savings.create({
                project_id, phase, commodity, value
            });

            return res.json(savings);


        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
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

            return res.redirect('/ecmprojectsform')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    deleteSavings: async (req, res) => {
        const { id } = req.params;

        try {
            await Prjt_savings.destroy({
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