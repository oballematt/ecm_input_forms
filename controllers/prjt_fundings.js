const { Prjt_funding } = require('../models');

module.exports = {

    createFunding: async (req, res) => {
        try {
            
            const { project_id, implementation, source, annual } = req.body;

            const funding = await Prjt_funding.create({
                project_id, implementation, source, annual
            });

            return res.redirect('/baseline')

        } catch (error) {

            console.error(error.message);
            return res.render('error');
            
        }
       
    },

    getForm: (req, res) => {
        return res.render('fundings')
    },

    getOneFunding: async (req, res) => {
        const { id } = req.params

        try {

            const funding = await Prjt_funding.findOne({
                where: {
                    id
                }
            });

            return res.render('editFundings', {
                funding
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateFunding: async (req, res) => {
        try {
            
            const { implementation, source, annual }  = req.body;
            const { id } = req.params
    
            const funding = await Prjt_funding.update({
                 implementation, source, annual
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

    deleteFunding: async (req, res) => {
        const { id } = req.params;

        try {
            await Prjt_funding.destroy({ 
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