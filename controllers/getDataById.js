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

            // These controllers are for finding an exisiting table record by project ID so the user can add onto it later if they need to.
            const costHours = await Prjt_costs_hours.findOne({
                where: {
                    project_id
                }
            });

            const fundings = await Prjt_funding.findOne({
                where: {
                    project_id
                }
            });

            const baselinePid = await Prjt_baseline.findOne({
                where: {
                    project_id
                }
            })

            const savingsPid = await Prjt_savings.findOne({
                where: {
                    project_id
                }
            })

            return res.render('edit/allForms', {
                metadata,
                costsHours,
                costHours,
                baseline,
                baselinePid,
                funding,
                fundings,
                savings,
                savingsPid
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);
        };

    },

    
}