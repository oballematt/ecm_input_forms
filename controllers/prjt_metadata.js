
    const { Prjt_metadata, Bldg_metadata } = require('../models');


    module.exports = {

        //Add metadata to database
        createMetadata: async (req, res) => {

            let { project_id, building, measure_type, status, staff_lead, staff_colead, analyst,
                project_description, nonenergy_benefits, baseline_start_date, reporting_period_start_date, length_baseline_period_days,
                length_reporting_period_days } = req.body;

            let errors = []

            try {   
                const bldgs = await Bldg_metadata.findAll();

                const pid = await Prjt_metadata.findAll({
                    where: {
                        project_id
                    }
                })

                if(pid.length !==0) {
                    errors.push({text: 'Project ID already exists'})
                }

                if(!project_id) {
                    errors.push({text: 'Please add a project ID' });
                  }
                  if(!building) {
                    errors.push({text: 'Please add a building' });
                  }
                  if(!measure_type) {
                    errors.push({text: 'Please add a measure type' });
                  }
                  if(!status) {
                    errors.push({text: 'Please add a status' });
                  }
                  if(!baseline_start_date) {
                    errors.push({text: 'Please add a start date' });
                  }
                  if(!reporting_period_start_date) {
                    errors.push({text: 'Please add a start date' });
                  }
                  if(!length_baseline_period_days) {
                    errors.push({text: 'Please add # of days' });
                  }
                  if(!length_reporting_period_days) {
                    errors.push({ text: 'Please # of days' });
                  }

                  if (errors.length > 0) {
                        res.render('metadata', {
                            errors,
                            bldgs
                        })
                  } else {
                    const metadata = await Prjt_metadata.create({
                        project_id, building, measure_type, status, staff_lead, staff_colead, analyst,
                        project_description, nonenergy_benefits, baseline_start_date, reporting_period_start_date, length_baseline_period_days,
                        length_reporting_period_days
                    });

    
                    return res.redirect('/costs_hours');

                  }
   
            } catch (error) {

                console.error(error.message);
                return res.status(500).json(error);
            };

        },


        // Gets building data from bldg_metadata table to list all building options when creating metadata
        getBuildings: async (req, res) => {
            try {

                const bldgs = await Bldg_metadata.findAll();

                return res.render('metadata', {
                    bldgs
                });

            } catch (error) {

                console.error(error.message);
                return res.status(500).json(error);

            };
        },


        getOneMetaData: async (req, res) => {
            const { project_id } = req.params
    
            try {
    
                const metadata = await Prjt_metadata.findOne({
                    where: {
                        project_id
                    }
                });

                const bldgs = await Bldg_metadata.findAll();
    
                return res.render('edit', {
                    metadata,
                    bldgs
                });
    
            } catch (error) {
    
                console.error(error.message);
                return res.status(500).json(error);
    
            };
        },
    
        updateMetaData: async (req, res) => {
            try {
                
                const { building, measure_type, status, staff_lead, staff_colead, analyst,
                    project_description, nonenergy_benefits, baseline_start_date, reporting_period_start_date, length_baseline_period_days,
                    length_reporting_period_days } = req.body;
                const { project_id } = req.params
        
                const metadata = await Prjt_metadata.update({
                    building,
                    measure_type,
                    status,
                    staff_colead,
                    staff_lead,
                    analyst,
                    project_description,
                    nonenergy_benefits,
                    baseline_start_date,
                    reporting_period_start_date,
                    length_baseline_period_days,
                    length_reporting_period_days
                },
                    {
                        where: {
                            project_id
                        }
                    });
    
                    return res.redirect('/find')
    
            } catch (error) {
    
                console.error(error.message);
                return res.status(500).json(error);
                
            }
            
        },

        deleteMetaData: async (req, res) => {
            const { project_id } = req.params;

            try {
                await Prjt_metadata.destroy({ 
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

