const { Prjt_savings } = require ('../models');

module.exports = {

    createSavings: async (req, res) => {
        const { project_id, phase, commodity, unit, value } = req.body;

        try {

            const savings = await Prjt_savings.create({
                project_id, phase, commodity, unit, value
            });

            return res.redirect('/');
            
        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);
            
        }
    },

    getForm: async (req, res) => {
        return res.render('savings')
    },

    getOneSavings: async (req, res) => {
        const { id } = req.params

        try {

            const savings = await Prjt_savings.findOne({
                where: {
                    id
                }
            });

            return res.render('editSavings', {
                savings
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateSavings: async (req, res) => {
        try {
            
            const { phase, commodity, unit, value }  = req.body;
            const { id } = req.params
    
            const savings = await Prjt_savings.update({
                phase, commodity, unit, value
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