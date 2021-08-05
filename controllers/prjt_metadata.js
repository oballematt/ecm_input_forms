
const { Prjt_metadata, Bldg_metadata, Prjt_status, Measure_types } = require('../models');


module.exports = {

    //Add metadata to database
    createMetadata: async (req, res) => {

        let { project_id, building, measure_type, status, staff_lead, staff_colead, analyst,
            project_description, nonenergy_benefits, baseline_start_date, reporting_period_start_date, length_baseline_period_days,
            length_reporting_period_days } = req.body;

        let errors = [];

        try {
            const bldgs = await Bldg_metadata.findAll({
                order: [
                    ['building', 'ASC']
                ]
            });

            const prjt_status = await Prjt_status.findAll({
                order: [
                    ['status', 'ASC']
                ]
            });

            const measure_types = await Measure_types.findAll({
                order: [
                    ['measure_type', 'ASC']
                ]
            });

            const pid = await Prjt_metadata.findAll({
                where: {
                    project_id
                }
            });

            if (pid.length !== 0) {
                errors.push({ text: 'Project ID already exists' })
            };

            if (!project_id || project_id === "undefined") {
                errors.push({ text: 'Please add a project ID' });
            };
            if (!building) {
                errors.push({ text: 'Please add a building' });
            };
            if (!measure_type) {
                errors.push({ text: 'Please add a measure type' });
            };
            if (!status) {
                errors.push({ text: 'Please add a status' });
            };
            if (!baseline_start_date) {
                errors.push({ text: 'Please add a start date for baseline' });
            };
            if (!reporting_period_start_date) {
                errors.push({ text: 'Please add a start date for reporting period' });
            };
            if (!length_baseline_period_days) {
                errors.push({ text: 'Please add # of days for baseline' });
            };
            if (!length_reporting_period_days) {
                errors.push({ text: 'Please add # of days for reporting period' });
            };

            if (errors.length > 0) {
                res.render('add/metadata', {
                    errors,
                    prjt_status,
                    measure_types,
                    bldgs,
                    project_id,
                    building,
                    measure_type,
                    status,
                    staff_lead,
                    staff_colead,
                    analyst,
                    project_description,
                    nonenergy_benefits,
                    baseline_start_date,
                    reporting_period_start_date,
                    length_baseline_period_days,
                    length_reporting_period_days
                });
            } else {
                await Prjt_metadata.create({
                    project_id, building, measure_type, status, staff_lead, staff_colead, analyst,
                    project_description, nonenergy_benefits, baseline_start_date, reporting_period_start_date, length_baseline_period_days,
                    length_reporting_period_days
                });


                return res.redirect('/ecmprojectsform');

            }

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);
        };

    },


    // Gets building data from bldg_metadata table to list all building options when creating metadata
    getBuildings: async (req, res) => {
        try {

            const bldgs = await Bldg_metadata.findAll({
                order: [
                    ['building', 'ASC']
                ]
            });

            const prjt_status = await Prjt_status.findAll({
                order: [
                    ['status', 'ASC']
                ]
            });

            const measure_types = await Measure_types.findAll({
                order: [
                    ['measure_type', 'ASC']
                ]
            });

            return res.render('add/metadata', {
                bldgs,
                prjt_status,
                measure_types
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

            const bldgs = await Bldg_metadata.findAll({
                order: [
                    ['building', 'ASC']
                ]
            });

            const prjt_status = await Prjt_status.findAll({
                order: [
                    ['status', 'ASC']
                ]
            });

            const measure_types = await Measure_types.findAll({
                order: [
                    ['measure_type', 'ASC']
                ]
            });

            return res.render('edit/edit', {
                metadata,
                bldgs,
                prjt_status,
                measure_types
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    updateMetaData: async (req, res) => {
        let { building, measure_type, status, staff_lead, staff_colead, analyst,
            project_description, nonenergy_benefits, baseline_start_date, reporting_period_start_date, length_baseline_period_days,
            length_reporting_period_days } = req.body;

        const { project_id } = req.params;

        let errors = []

        try {

            const metadata = await Prjt_metadata.findOne({
                where: {
                    project_id
                }
            });

            if (!baseline_start_date) {
                errors.push({ text: 'Please add a start date for baseline' });
            };
            if (!reporting_period_start_date) {
                errors.push({ text: 'Please add a start date for reporting period' });
            };
            if (!length_baseline_period_days) {
                errors.push({ text: 'Please add # of days for baseline' });
            };
            if (!length_reporting_period_days) {
                errors.push({ text: 'Please add # of days for reporting period' });
            };

            if (errors.length > 0) {
                res.render('edit/edit', {
                    metadata,
                    errors,
                    baseline_start_date,
                    reporting_period_start_date,
                    length_baseline_period_days,
                    length_reporting_period_days
                });

            } else {

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

                return res.redirect('/ecmprojectsform')
            }

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

            return res.redirect('/')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    }

}

