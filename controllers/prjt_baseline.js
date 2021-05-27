const { Prjt_baseline } = require('../models');

module.exports = {

    createBaseline: async (req, res) => {
        const { project_id, commodity, unit, value } = req.body;

        try {
            
            const baseline = await Prjt_baseline.create({
                project_id, commodity, unit, value
            });
            
            return res.redirect('/savings')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);
            
        };
    },

    getForm:  (req, res) => {
        return res.render('baseline');
    },

    getOneBaseline: async (req, res) => {
        const { id } = req.params

        try {

            const baseline = await Prjt_baseline.findOne({
                where: {
                    id
                }
            });

            return res.render('editBaseline', {
                baseline
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateBaseline: async (req, res) => {
        try {
            
            const { commodity, unit, value }  = req.body;
            const { id } = req.params
    
            const baseline = await Prjt_baseline.update({
                commodity, unit, value
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

    deleteBaseline: async (req, res) => {
        const { id } = req.params;

        try {
            const baseline = await Prjt_baseline.destroy({ 
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