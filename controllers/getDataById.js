const { Prjt_metadata, Prjt_costs_hours, Prjt_baseline, Prjt_funding, Prjt_savings } = require('../models');

module.exports = {
    //All of the below controllers render onto the /find route of the project so when a user searches for a specific project ID
    //all of the relevant data for that ID is displayed and then the user can choose what they want to accomplish for each individual data record
    findData: async (req, res) => {
        try {
            const { project_id } = req.body

            //These controllers are for finding all exisiting records in these tables based on project_id so the user can view the information
            //and either update or delete the information if they need too. 
            const metadata = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            const costsHours = await Prjt_costs_hours.findAll({
                where: {
                    project_id
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            const baseline = await Prjt_baseline.findAll({
                where: {
                    project_id
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            const funding = await Prjt_funding.findAll({
                where: {
                    project_id
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            const savings = await Prjt_savings.findAll({
                where: {
                    project_id
                },
                order: [
                    ['id', 'ASC']
                ]
            });

            const projectId = await Prjt_metadata.findAll({
                order: [
                    ['project_id', 'ASC']
                ]
            })

            return res.render('edit/allForms', {
                metadata,
                costsHours,           
                baseline,             
                funding,              
                savings,              
                projectId
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);
        };

    },

    getAllPid: async (req, res) => {
       
        try {

            const projectId = await Prjt_metadata.findAll({
                order: [
                    ['project_id', 'ASC']
                ]
            })

            return res.render('edit/allForms', {
                projectId
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
        
    },

    deleteAllData: async (req, res) => {
        const { project_id } = req.params;

        try {
            await Prjt_metadata.destroy({ 
                where: {
                    project_id
                }
            });

            await Prjt_costs_hours.destroy({ 
                where: {
                    project_id
                }
            });


            await Prjt_funding.destroy({ 
                where: {
                    project_id
                }
            });


            await Prjt_baseline.destroy({ 
                where: {
                    project_id
                }
            });


            await Prjt_savings.destroy({ 
                where: {
                    project_id
                }
            });


            return res.redirect('/find')

        } catch (error) {
            
            console.error(error.message);
            return res.status(500).json(error);
            
        }
    }

    
}