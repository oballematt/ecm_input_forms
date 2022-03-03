const { Prjt_funding, Prjt_metadata } = require('../../models');

module.exports = {

    createFunding: async (req, res) => {

        let { project_id, implementation, source, annual } = req.body;

        try {
            const funding = await Prjt_funding.create({
                project_id, implementation, source, annual
            });

            return res.json(funding);

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    getOneFunding: async (req, res) => {
        const { id } = req.params

        try {

            const funding = await Prjt_funding.findOne({
                where: {
                    id
                }
            });

            return res.render('ecmForms/edit/editFundings', {
                funding
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateFunding: async (req, res) => {

        const { implementation, source, annual } = req.body;
        const { id } = req.params

        try {

            const funding = await Prjt_funding.update({
                implementation, source, annual
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

    deleteFunding: async (req, res) => {
        const { id } = req.params;

        try {
            await Prjt_funding.destroy({
                where: {
                    id
                }
            });

            res.json("Deleted")

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    }

}