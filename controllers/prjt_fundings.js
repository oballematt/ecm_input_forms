const { Prjt_funding, Prjt_metadata } = require('../models');

module.exports = {

    createFundingByProjectId: async (req, res) => {

        let { project_id, implementation, source, annual } = req.body;

        let errors = []

        try {

            const fundings = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            if (!implementation) {
                errors.push({ text: "please select an option for source" })
            };

            if (!source) {
                errors.push({ text: "please enter a value for implementation" })
            };

            if (!annual) {
                errors.push({ text: "please enter a value for annual" })
            };

            if (errors.length > 0) {
                res.render('add/addFundings', {
                    errors, implementation, source, annual, fundings
                })

            } else {

                const funding = await Prjt_funding.create({
                    project_id, implementation, source, annual
                });

                return res.redirect('/')

            };

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

            return res.render('edit/editFundings', {
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

            return res.redirect('/')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }

    },

    getOneByProjectId: async (req, res) => {
        const { project_id } = req.params

        try {

            const fundings = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            return res.render('add/addFundings', {
                fundings
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
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