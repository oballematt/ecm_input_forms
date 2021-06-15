const { Prjt_source_percent_each, Prjt_source_percent_total, Prjt_plant_each, Prjt_savings_by_comm,
    Prjt_plant_total, Prjt_savings_fr_fb_totals, Prjt_misc_savings_by_entity, Prjt_financial_analysis } = require("../models");

const { Op } = require('sequelize')

module.exports = {

    getData: async (req, res) => {

        const { project_id } = req.params;

        try {

            const response = await Prjt_source_percent_each.findAll({
                where: {
                    project_id,
                    commodity: {
                        [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "peak_CHW", "labor"]
                    },
                    phase: 'predicted'
                }
            });

            const percentTotal = await Prjt_source_percent_total.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    comm_type: 'energy'
                }
            });

            const response1 = await Prjt_plant_each.findAll({
                where: {
                    project_id,
                    commodity: {
                        [Op.in]: ["CHW", "ELE", "STM", "HHW"]
                    },
                    plant_commodity: 'plantgas',
                    phase: 'predicted'
                }
            });

            const response2 = await Prjt_plant_each.findAll({
                where: {
                    project_id,
                    plant_commodity: 'ctwater',
                    phase: 'predicted'
                }
            });

            const response3 = await Prjt_plant_total.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    plant_commodity: 'plantgas'
                }
            });

            const response4 = await Prjt_savings_by_comm.findAll({
                where: {
                    project_id,
                    commodity: {
                        [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "labor"]
                    },
                    phase: 'predicted',
                    entity: 'uem'
                }
            });

            const response5 = await Prjt_savings_by_comm.findAll({
                where: {
                    project_id,
                    commodity: {
                        [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "labor"]
                    },
                    phase: 'predicted',
                    entity: 'univ'
                }
            });

            const response6 = await Prjt_savings_by_comm.findAll({
                where: {
                    project_id,
                    commodity: {
                        [Op.in]: ["CHW", "ELE", "STM", "HHW", "GAS", "WTR", "labor"]
                    },
                    phase: 'predicted',
                    entity: 'aux'
                }
            });

            const response7 = await Prjt_savings_fr_fb_totals.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'aux'
                }
            });

            const response8 = await Prjt_savings_fr_fb_totals.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'uem'
                }
            });

            const response9 = await Prjt_savings_fr_fb_totals.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'univ'
                }
            });

            const response10 = await Prjt_misc_savings_by_entity.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'aux'
                }
            });

            const response11 = await Prjt_misc_savings_by_entity.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'uem'
                }
            });

            const response12 = await Prjt_misc_savings_by_entity.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'univ'
                }
            });

            const ann1 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'aux'
                }
            });

            const ann2 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'uem'
                }
            });

            const ann3 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'univ'
                }
            });

            const payback1 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'aux'
                }
            });

            const payback2 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'uem'
                }
            });

            const payback3 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'univ'
                }
            });

            const npv1 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'aux'
                }
            });

            const npv2 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'uem'
                }
            });

            const npv3 = await Prjt_financial_analysis.findOne({
                where: {
                    project_id,
                    phase: 'predicted',
                    entity: 'univ'
                }
            });


            return res.render('predicted', {
                response,
                response1,
                response2,
                response3,
                response4,
                response5,
                response6,
                response7,
                response8,
                response9,
                response10,
                response11,
                response12,
                ann1,
                ann2,
                ann3,
                payback1,
                payback2,
                payback3,
                npv1,
                npv2,
                npv3,
                percentTotal
            });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json(error);
        }

    }


}