const { Prjt_source_percent_each, Prjt_source_percent_total, Prjt_plant_each, Prjt_savings_by_comm, 
    Prjt_plant_total, Prjt_savings_fr_fb_totals, Prjt_misc_savings_by_entity, Prjt_financial_analysis } = require("../models");


module.exports = {    
    
    getData:  async (req, res, project_id) => {

        // const { project_id } = req.params;

        try {

            const chw = await Prjt_source_percent_each.findAll({
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
                    entity: 'uem',
                    commodity: 'CHW'
                }
            });
    
            const ele3 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'uem',
                    commodity: 'ELE'
                }
            });
    
            const stm3 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'uem',
                    commodity: 'STM'
                }
            });
    
            const hhw3 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'uem',
                    commodity: 'HHW'
                }
            });
    
            const gas3 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'uem',
                    commodity: 'GAS'
                }
            });
    
            const water3 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'uem',
                    commodity: 'WTR'
                }
            });

    
            const chw4 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'univ',
                    commodity: 'CHW'
                }
            });
    
            const ele4 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'univ',
                    commodity: 'ELE'
                }
            });
    
            const stm4 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'univ',
                    commodity: 'STM'
                }
            });
    
            const hhw4 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'univ',
                    commodity: 'HHW'
                }
            });
    
            const gas4 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'univ',
                    commodity: 'GAS'
                }
            });
    
            const water4 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'univ',
                    commodity: 'WTR'
                }
            });
    
            const labor4 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'univ',
                    commodity: 'labor'
                }
            });
    
            const chw5 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'aux',
                    commodity: 'CHW'
                }
            });
    
            const ele5 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'aux',
                    commodity: 'ELE'
                }
            });
    
            const stm5 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'aux',
                    commodity: 'STM'
                }
            });
    
            const hhw5 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'aux',
                    commodity: 'HHW'
                }
            });
    
            const gas5 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'aux',
                    commodity: 'GAS'
                }
            });
    
            const water5 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
                    entity: 'aux',
                    commodity: 'WTR'
                }
            });
    
            const labor5 = await Prjt_savings_by_comm.findOne({
                where: {
                    project_id,
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

            // return res.render('edit/allForms', {
                // chw,
                // ele,
                // stm,
                // hhw,
                // gas,
                // water,
                // peakchw,
                // labor,
                // percentTotal,
                // chw2,
                // chw2_1,
                // ele2,
                // stm2,
                // hhw2,
                // plantTotal,
                // chw3,
                // ele3,
                // hhw3,
                // stm3,
                // gas3,
                // water3,
                // chw4,
                // ele4,
                // stm4,
                // hhw4,
                // gas4,
                // water4,
                // labor4,
                // chw5,
                // ele5,
                // stm5,
                // hhw5,
                // gas5,
                // water5,
                // labor5,
                // total1,
                // total2,
                // total3,
                // misc1,
                // misc2,
                // misc3,
                // ann1,
                // ann2,
                // ann3,
                // payback1,
                // payback2,
                // payback3,
                // npv1,
                // npv2,
                // npv3,
            // });
    
            
        } catch (error) {
            console.error(error.message);
            return res.status(500).json(error);      
        }
       
    }


}