const { Prjt_metadata, Prjt_costs_hours, Prjt_baseline, Prjt_funding, Prjt_savings,
    Prjt_misc_savings, Prjt_source_percent_each, Prjt_source_percent_total, Prjt_plant_each, Prjt_savings_by_comm,
    Prjt_plant_total, Prjt_savings_fr_fb_totals, Prjt_misc_savings_by_entity, Prjt_financial_analysis } = require('../models');

const { Op } = require("sequelize");

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

            if (!project_id) {
                errors.push({ text: "Please select a project ID" })
            }

            if (errors.length > 0) {
                res.render('edit/allForms', {
                    errors,
                    projectId
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

                const miscSavings = await Prjt_misc_savings.findAll({
                    where: {
                        project_id
                    },
                    order: [
                        ['id', 'ASC']
                    ]
                });

                const chw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'CHW',
                        phase: 'M&V'
                    }
                });

                const ele = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'ELE',
                        phase: 'M&V'
                    }
                });
                const stm = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'STM',
                        phase: 'M&V'
                    }
                });
                const hhw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'HHW',
                        phase: 'M&V'
                    }
                });
                const gas = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'GAS',
                        phase: 'M&V'
                    }
                });
                const water = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'WTR',
                        phase: 'M&V'
                    }
                });
                const peakchw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'Peak CHW',
                        phase: 'M&V'
                    }
                });
                const labor = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'Labor',
                        phase: 'M&V'
                    }
                });

                const percentTotal = await Prjt_source_percent_total.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        comm_type: 'energy'
                    }
                });

                const chw2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        plant_commodity: 'Plant gas',
                        commodity: 'CHW'
                    }
                });

                const chw2_1 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        plant_commodity: 'CT water',
                        commodity: 'CHW'
                    }
                });

                const ele2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        commodity: 'ELE'
                    }
                });

                const stm2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        commodity: 'STM'
                    }
                });

                const hhw2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        commodity: 'HHW'
                    }
                });

                const plantTotal = await Prjt_plant_total.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        plant_commodity: 'Plant gas'
                    }
                })

                const chw3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM',
                        commodity: 'CHW'
                    }
                });

                const ele3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM',
                        commodity: 'ELE'
                    }
                });

                const stm3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM',
                        commodity: 'STM'
                    }
                });

                const hhw3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM',
                        commodity: 'HHW'
                    }
                });

                const gas3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM',
                        commodity: 'GAS'
                    }
                });

                const water3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM',
                        commodity: 'WTR'
                    }
                });


                const chw4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ',
                        commodity: 'CHW'
                    }
                });

                const ele4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ',
                        commodity: 'ELE'
                    }
                });

                const stm4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ',
                        commodity: 'STM'
                    }
                });

                const hhw4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ',
                        commodity: 'HHW'
                    }
                });

                const gas4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ',
                        commodity: 'GAS'
                    }
                });

                const water4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ',
                        commodity: 'WTR'
                    }
                });

                const labor4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ',
                        commodity: 'Labor'
                    }
                });

                const chw5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX',
                        commodity: 'CHW'
                    }
                });

                const ele5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX',
                        commodity: 'ELE'
                    }
                });

                const stm5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX',
                        commodity: 'STM'
                    }
                });

                const hhw5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX',
                        commodity: 'HHW'
                    }
                });

                const gas5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX',
                        commodity: 'GAS'
                    }
                });

                const water5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX',
                        commodity: 'WTR'
                    }
                });

                const labor5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX',
                        commodity: 'Labor'
                    }
                });

                const total1 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM'
                    }
                });

                const total2 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ'
                    }
                });

                const total3 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX'
                    }
                });

                const misc1 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM'
                    }
                });

                const misc2 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ'
                    }
                });

                const misc3 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX'
                    }
                });

                const ann1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM'
                    }
                });

                const ann2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ'
                    }
                });

                const ann3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX'
                    }
                });

                const payback1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM'
                    }
                });

                const payback2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ'
                    }
                });

                const payback3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX'
                    }
                });

                const npv1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'UEM'
                    }
                });

                const npv2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'Univ'
                    }
                });

                const npv3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'M&V',
                        entity: 'AUX'
                    }
                });

                const p_chw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'CHW',
                        phase: 'Predicted'
                    }
                });

                const p_ele = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'ELE',
                        phase: 'Predicted'
                    }
                });
                const p_stm = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'STM',
                        phase: 'Predicted'
                    }
                });
                const p_hhw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'HHW',
                        phase: 'Predicted'
                    }
                });
                const p_gas = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'GAS',
                        phase: 'Predicted'
                    }
                });
                const p_water = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'WTR',
                        phase: 'Predicted'
                    }
                });
                const p_peakchw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'Peak CHW',
                        phase: 'Predicted'
                    }
                });
                const p_labor = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'Labor',
                        phase: 'Predicted'
                    }
                });

                const p_percentTotal = await Prjt_source_percent_total.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        comm_type: 'energy'
                    }
                });

                const p_chw2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        plant_commodity: 'Plant gas',
                        commodity: 'CHW'
                    }
                });

                const p_chw2_1 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        plant_commodity: 'CT water',
                        commodity: 'CHW'
                    }
                });

                const p_ele2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        commodity: 'ELE'
                    }
                });

                const p_stm2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        commodity: 'STM'
                    }
                });

                const p_hhw2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        commodity: 'HHW'
                    }
                });

                const p_plantTotal = await Prjt_plant_total.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        plant_commodity: 'Plant gas'
                    }
                })

                const p_chw3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM',
                        commodity: 'CHW'
                    }
                });

                const p_ele3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM',
                        commodity: 'ELE'
                    }
                });

                const p_stm3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM',
                        commodity: 'STM'
                    }
                });

                const p_hhw3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM',
                        commodity: 'HHW'
                    }
                });

                const p_gas3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM',
                        commodity: 'GAS'
                    }
                });

                const p_water3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM',
                        commodity: 'WTR'
                    }
                });


                const p_chw4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ',
                        commodity: 'CHW'
                    }
                });

                const p_ele4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ',
                        commodity: 'ELE'
                    }
                });

                const p_stm4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ',
                        commodity: 'STM'
                    }
                });

                const p_hhw4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ',
                        commodity: 'HHW'
                    }
                });

                const p_gas4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ',
                        commodity: 'GAS'
                    }
                });

                const p_water4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ',
                        commodity: 'WTR'
                    }
                });

                const p_labor4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ',
                        commodity: 'Labor'
                    }
                });

                const p_chw5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX',
                        commodity: 'CHW'
                    }
                });

                const p_ele5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX',
                        commodity: 'ELE'
                    }
                });

                const p_stm5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX',
                        commodity: 'STM'
                    }
                });

                const p_hhw5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX',
                        commodity: 'HHW'
                    }
                });

                const p_gas5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX',
                        commodity: 'GAS'
                    }
                });

                const p_water5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX',
                        commodity: 'WTR'
                    }
                });

                const p_labor5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX',
                        commodity: 'Labor'
                    }
                });

                const p_total1 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM'
                    }
                });

                const p_total2 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ'
                    }
                });

                const p_total3 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX'
                    }
                });

                const p_misc1 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM'
                    }
                });

                const p_misc2 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ'
                    }
                });

                const p_misc3 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX'
                    }
                });

                const p_ann1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM'
                    }
                });

                const p_ann2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ'
                    }
                });

                const p_ann3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX'
                    }
                });

                const p_payback1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM'
                    }
                });

                const p_payback2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ'
                    }
                });

                const p_payback3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX'
                    }
                });

                const p_npv1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'UEM'
                    }
                });

                const p_npv2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'Univ'
                    }
                });

                const p_npv3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'Predicted',
                        entity: 'AUX'
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
                    chw,
                    ele,
                    stm,
                    hhw,
                    gas,
                    water,
                    peakchw,
                    labor,
                    percentTotal,
                    chw2,
                    chw2_1,
                    ele2,
                    stm2,
                    hhw2,
                    plantTotal,
                    chw3,
                    ele3,
                    hhw3,
                    stm3,
                    gas3,
                    water3,
                    chw4,
                    ele4,
                    stm4,
                    hhw4,
                    gas4,
                    water4,
                    labor4,
                    chw5,
                    ele5,
                    stm5,
                    hhw5,
                    gas5,
                    water5,
                    labor5,
                    total1,
                    total2,
                    total3,
                    misc1,
                    misc2,
                    misc3,
                    ann1,
                    ann2,
                    ann3,
                    payback1,
                    payback2,
                    payback3,
                    npv1,
                    npv2,
                    npv3,
                    p_chw,
                    p_ele,
                    p_stm,
                    p_hhw,
                    p_gas,
                    p_water,
                    p_peakchw,
                    p_labor,
                    p_percentTotal,
                    p_chw2,
                    p_chw2_1,
                    p_ele2,
                    p_stm2,
                    p_hhw2,
                    p_plantTotal,
                    p_chw3,
                    p_ele3,
                    p_hhw3,
                    p_stm3,
                    p_gas3,
                    p_water3,
                    p_chw4,
                    p_ele4,
                    p_stm4,
                    p_hhw4,
                    p_gas4,
                    p_water4,
                    p_labor4,
                    p_chw5,
                    p_ele5,
                    p_stm5,
                    p_hhw5,
                    p_gas5,
                    p_water5,
                    p_labor5,
                    p_total1,
                    p_total2,
                    p_total3,
                    p_misc1,
                    p_misc2,
                    p_misc3,
                    p_ann1,
                    p_ann2,
                    p_ann3,
                    p_payback1,
                    p_payback2,
                    p_payback3,
                    p_npv1,
                    p_npv2,
                    p_npv3,
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

            const staffLead1 = await Prjt_metadata.findAll({
                where: {
                    staff_lead: {
                        [Op.in]:['Adam Keeling', 'Amanda Berens', 'Buddy Bishop', 'Cedric Bouey', 'Dave Cooper', 'Grace Hsieh', 
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
                staffLead1,
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

            return res.redirect('/')

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        }
    }


}
