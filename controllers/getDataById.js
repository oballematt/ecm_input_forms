const { Prjt_metadata, Prjt_costs_hours, Prjt_baseline, Prjt_funding, Prjt_savings, 
    Prjt_misc_savings, Prjt_source_percent_each, Prjt_source_percent_total, Prjt_plant_each, Prjt_savings_by_comm, 
    Prjt_plant_total, Prjt_savings_fr_fb_totals, Prjt_misc_savings_by_entity, Prjt_financial_analysis } = require('../models');

const test = require('./m_v')

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
                        phase: 'mv'
                    }
                });
               
                const ele = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'ELE',
                        phase: 'mv'
                    }
                });
                const stm = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'STM',
                        phase: 'mv'
                    }
                });
                const hhw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'HHW',
                        phase: 'mv'
                    }
                });
                const gas = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'GAS',
                        phase: 'mv'
                    }
                });
                const water = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'WTR',
                        phase: 'mv'
                    }
                });
                const peakchw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'peak_CHW',
                        phase: 'mv'
                    }
                });
                const labor = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'labor',
                        phase: 'mv'
                    }
                });
        
                const percentTotal = await Prjt_source_percent_total.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        comm_type: 'energy'
                    }
                });
        
                const chw2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        plant_commodity: 'plantgas',
                        commodity: 'CHW'
                    }
                });
    
                const chw2_1 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        plant_commodity: 'ctwater',
                        commodity: 'CHW'
                    }
                });
        
                const ele2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        commodity: 'ELE'
                    }
                });
        
                const stm2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        commodity: 'STM'
                    }
                });
        
                const hhw2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        commodity: 'HHW'
                    }
                });
    
                const plantTotal = await Prjt_plant_total.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        plant_commodity: 'plantgas'
                    }
                })
        
                const chw3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem',
                        commodity: 'CHW'
                    }
                });
        
                const ele3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem',
                        commodity: 'ELE'
                    }
                });
        
                const stm3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem',
                        commodity: 'STM'
                    }
                });
        
                const hhw3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem',
                        commodity: 'HHW'
                    }
                });
        
                const gas3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem',
                        commodity: 'GAS'
                    }
                });
        
                const water3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem',
                        commodity: 'WTR'
                    }
                });
    
        
                const chw4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ',
                        commodity: 'CHW'
                    }
                });
        
                const ele4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ',
                        commodity: 'ELE'
                    }
                });
        
                const stm4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ',
                        commodity: 'STM'
                    }
                });
        
                const hhw4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ',
                        commodity: 'HHW'
                    }
                });
        
                const gas4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ',
                        commodity: 'GAS'
                    }
                });
        
                const water4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ',
                        commodity: 'WTR'
                    }
                });
        
                const labor4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ',
                        commodity: 'labor'
                    }
                });
        
                const chw5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux',
                        commodity: 'CHW'
                    }
                });
        
                const ele5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux',
                        commodity: 'ELE'
                    }
                });
        
                const stm5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux',
                        commodity: 'STM'
                    }
                });
        
                const hhw5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux',
                        commodity: 'HHW'
                    }
                });
        
                const gas5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux',
                        commodity: 'GAS'
                    }
                });
        
                const water5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux',
                        commodity: 'WTR'
                    }
                });
        
                const labor5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux',
                        commodity: 'labor'
                    }
                });
    
                const total1 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem'
                    }
                });
    
                const total2 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ'
                    }
                });
    
                const total3 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux'
                    }
                });
    
                const misc1 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem'
                    }
                });
    
                const misc2 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ'
                    }
                });
    
                const misc3 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux'
                    }
                });
    
                const ann1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem'
                    }
                });
    
                const ann2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ'
                    }
                });
    
                const ann3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux'
                    }
                });
    
                const payback1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem'
                    }
                });
    
                const payback2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ'
                    }
                });
    
                const payback3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux'
                    }
                });
    
                const npv1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'uem'
                    }
                });
    
                const npv2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'univ'
                    }
                });
    
                const npv3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'mv',
                        entity: 'aux'
                    }
                });

                const p_chw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'CHW',
                        phase: 'predicted'
                    }
                });
               
                const p_ele = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'ELE',
                        phase: 'predicted'
                    }
                });
                const p_stm = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'STM',
                        phase: 'predicted'
                    }
                });
                const p_hhw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'HHW',
                        phase: 'predicted'
                    }
                });
                const p_gas = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'GAS',
                        phase: 'predicted'
                    }
                });
                const p_water = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'WTR',
                        phase: 'predicted'
                    }
                });
                const p_peakchw = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'peak_CHW',
                        phase: 'predicted'
                    }
                });
                const p_labor = await Prjt_source_percent_each.findOne({
                    where: {
                        project_id,
                        commodity: 'labor',
                        phase: 'predicted'
                    }
                });
        
                const p_percentTotal = await Prjt_source_percent_total.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        comm_type: 'energy'
                    }
                });
        
                const p_chw2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        plant_commodity: 'plantgas',
                        commodity: 'CHW'
                    }
                });
    
                const p_chw2_1 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        plant_commodity: 'ctwater',
                        commodity: 'CHW'
                    }
                });
        
                const p_ele2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        commodity: 'ELE'
                    }
                });
        
                const p_stm2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        commodity: 'STM'
                    }
                });
        
                const p_hhw2 = await Prjt_plant_each.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        commodity: 'HHW'
                    }
                });
    
                const p_plantTotal = await Prjt_plant_total.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        plant_commodity: 'plantgas'
                    }
                })
        
                const p_chw3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem',
                        commodity: 'CHW'
                    }
                });
        
                const p_ele3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem',
                        commodity: 'ELE'
                    }
                });
        
                const p_stm3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem',
                        commodity: 'STM'
                    }
                });
        
                const p_hhw3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem',
                        commodity: 'HHW'
                    }
                });
        
                const p_gas3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem',
                        commodity: 'GAS'
                    }
                });
        
                const p_water3 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem',
                        commodity: 'WTR'
                    }
                });
    
        
                const p_chw4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ',
                        commodity: 'CHW'
                    }
                });
        
                const p_ele4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ',
                        commodity: 'ELE'
                    }
                });
        
                const p_stm4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ',
                        commodity: 'STM'
                    }
                });
        
                const p_hhw4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ',
                        commodity: 'HHW'
                    }
                });
        
                const p_gas4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ',
                        commodity: 'GAS'
                    }
                });
        
                const p_water4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ',
                        commodity: 'WTR'
                    }
                });
        
                const p_labor4 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ',
                        commodity: 'labor'
                    }
                });
        
                const p_chw5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux',
                        commodity: 'CHW'
                    }
                });
        
                const p_ele5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux',
                        commodity: 'ELE'
                    }
                });
        
                const p_stm5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux',
                        commodity: 'STM'
                    }
                });
        
                const p_hhw5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux',
                        commodity: 'HHW'
                    }
                });
        
                const p_gas5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux',
                        commodity: 'GAS'
                    }
                });
        
                const p_water5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux',
                        commodity: 'WTR'
                    }
                });
        
                const p_labor5 = await Prjt_savings_by_comm.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux',
                        commodity: 'labor'
                    }
                });
    
                const p_total1 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem'
                    }
                });
    
                const p_total2 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ'
                    }
                });
    
                const p_total3 = await Prjt_savings_fr_fb_totals.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux'
                    }
                });
    
                const p_misc1 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem'
                    }
                });
    
                const p_misc2 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ'
                    }
                });
    
                const p_misc3 = await Prjt_misc_savings_by_entity.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux'
                    }
                });
    
                const p_ann1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem'
                    }
                });
    
                const p_ann2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ'
                    }
                });
    
                const p_ann3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux'
                    }
                });
    
                const p_payback1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem'
                    }
                });
    
                const p_payback2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ'
                    }
                });
    
                const p_payback3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux'
                    }
                });
    
                const p_npv1 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'uem'
                    }
                });
    
                const p_npv2 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'univ'
                    }
                });
    
                const p_npv3 = await Prjt_financial_analysis.findOne({
                    where: {
                        project_id,
                        phase: 'predicted',
                        entity: 'aux'
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