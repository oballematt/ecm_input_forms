const { Prjt_baseline, Prjt_metadata } = require('../models');

module.exports = {

    createBaseline: async (req, res) => {
        let { project_id, commodity, value } = req.body;

        let errors = [];

        try {

            const baseline = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            if (!commodity){
                errors.push({text: "please select an option for commodity"})
            };

            if (!value){
                errors.push({text: "please enter a value for value field"})
            };

            if (errors.length > 0){
                 res.render('add/addBaseline', {
                    errors, commodity, value, baseline
                })
            
            } else {
            
            const baseline = await Prjt_baseline.create({
                project_id, commodity, value
            });
            
            return res.redirect('/find');
        };

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);
            
        };
    },

    getForm:  (req, res) => {
        return res.render('create/baseline');
    },

    getOneBaseline: async (req, res) => {
        const { id } = req.params

        try {

            const baseline = await Prjt_baseline.findOne({
                where: {
                    id
                }
            });

            return res.render('edit/editBaseline', {
                baseline
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateBaseline: async (req, res) => {
        try {
            
            const { commodity, value }  = req.body;
            const { id } = req.params
    
            const baseline = await Prjt_baseline.update({
                commodity, value
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

            const baseline = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            return res.render('add/addBaseline', {
                baseline
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
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