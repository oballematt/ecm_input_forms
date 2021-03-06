const { Prjt_baseline, Prjt_metadata } = require('../../models');

module.exports = {

    createBaseline: async (req, res) => {
        let { project_id, commodity, value } = req.body;

        try {
            
            const baseline = await Prjt_baseline.create({
                project_id, commodity, value
            });
            
            return res.json(baseline);

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

                return res.redirect('/ecmforms')

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

            res.json("deleted")

        } catch (error) {
            
            console.error(error.message);
            return res.status(500).json(error);
            
        }
    }

}