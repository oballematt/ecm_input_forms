const { Prjt_metadata, Prjt_costs_hours, Prjt_baseline, Prjt_funding, Prjt_savings, 
    Prjt_misc_savings, Prjt_source_percent_each, Prjt_source_percent_total, Prjt_plant_each, Prjt_savings_by_comm, 
    Prjt_plant_total, Prjt_savings_fr_fb_totals, Prjt_misc_savings_by_entity, Prjt_financial_analysis } = require('../models');

const {Op} = require("sequelize")

module.exports = {
  
    findData: async (req, res) => {
        try {
            const { project_id } = req.body

            let errors = []

            const projectId = await Prjt_metadata.findAll({
                order: [
                    ['project_id', 'ASC']
                ]
            })

            const staffLead = await Prjt_metadata.findAll({
                where: {
                    staff_lead: {
                        [Op.in]: ['Adam Keeling', 'Amanda Berens', 'Buddy Bishop', 'Cedric Bouey', 'Dave Cooper', 'Grace Hsieh',
                            'John Milton', 'Matt Stevens', 'Meagan Jones', 'Pat Mazur', 'Richard Shearman', 'Travis Isakson']
                    }
                },
                order: [
                    ['staff_lead', 'ASC'],
                    ['project_id', 'ASC']
                ]
            })

            if (!project_id) {
                errors.push({ text: "Please select a project ID" })
            }

            if (errors.length > 0) {
                res.render('edit/allForms', {
                    errors,
                    projectId,
                    staffLead
                })

            } else {

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
                        project_id,
                        commodity: {
                            [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "Peak CHW", "Labor"]
                        }
                    }
                })

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
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        commodity: {
                            [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "Peak CHW", "Labor"]
                        }

                    }
                });

                const miscSavings = await Prjt_misc_savings.findAll({
                    where: {
                        project_id
                    },
                    order: [
                        ['id', 'ASC']
                    ]
                });

                const percentEach = await Prjt_source_percent_each.findAll({
                    where: {
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        commodity: {
                            [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "Peak CHW", "Labor"]
                        }

                    }
                })

                const percentTotal = await Prjt_source_percent_total.findAll({
                    where: {
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        comm_type: 'energy'
                    }
                });

                const plantEach = await Prjt_plant_each.findAll({
                    where: {
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        plant_commodity: {
                            [Op.in]: ['Plant gas', 'CT water']
                        },
                        commodity: {
                            [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "Peak CHW", "Labor"]
                        }
                    }

                })

                const plantTotal = await Prjt_plant_total.findAll({
                    where: {
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        plant_commodity: 'Plant gas'
                    }
                })

                const commSavings = await Prjt_savings_by_comm.findAll({
                    where: {
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        entity: {
                            [Op.in]: ['UEM', 'Univ', 'AUX']
                        },
                        commodity: {
                            [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "Labor"]
                        }
                    }
                })

                const commSavingsTotal = await Prjt_savings_fr_fb_totals.findAll({
                    where: {
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        entity: {
                            [Op.in]: ['UEM', 'Univ', 'AUX']
                        }
                    }
                });

                const misc = await Prjt_misc_savings_by_entity.findAll({
                    where: {
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        entity: {
                            [Op.in]: ['UEM', 'Univ', 'AUX']
                        }
                    }
                });

                const financialAnalysis = await Prjt_financial_analysis.findAll({
                    where: {
                        project_id,
                        phase: {
                            [Op.in]: ['Predicted', 'M&V']
                        },
                        entity: {
                            [Op.in]: ['UEM', 'Univ', 'AUX']
                        }
                    }
                });

                return res.render('edit/allForms', {
                    metadata,                                                                           
                    costsHours,                                                                           
                    baseline,                                                                           
                    funding,                                                                           
                    savings,                                                                           
                    miscSavings,                                                                           
                    projectId,                                                                           
                    staffLead,                                                                           
                    percentEach,                                                                           
                    percentTotal,                                                                           
                    plantEach,                                                                           
                    plantTotal,                                                                           
                    commSavings,                                                                           
                    commSavingsTotal,                                                                           
                    misc,                                                                           
                    financialAnalysis                                                              
                });
            }

          
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

            const staffLead = await Prjt_metadata.findAll({
                where: {
                    staff_lead: {
                        [Op.in]: ['Adam Keeling', 'Amanda Berens', 'Buddy Bishop', 'Cedric Bouey', 'Dave Cooper', 'Grace Hsieh',
                            'John Milton', 'Matt Stevens', 'Meagan Jones', 'Pat Mazur', 'Richard Shearman', 'Travis Isakson']
                    }
                },
                order: [
                    ['staff_lead', 'ASC'],
                    ['project_id', 'ASC']
                ]
            })

            return res.render('edit/allForms', {
                projectId,
                staffLead
            });

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };

    },

    deleteAllData: async (req, res) => {
        const { project_id } = req.params;

        try {

            await Prjt_baseline.destroy({
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

            await Prjt_savings.destroy({
                where: {
                    project_id
                }
            });

            await Prjt_misc_savings.destroy({
                where: {
                    project_id
                }
            })

            await Prjt_metadata.destroy({
                where: {
                    project_id
                }
            });

            return res.redirect('/ecmforms')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    }


}
