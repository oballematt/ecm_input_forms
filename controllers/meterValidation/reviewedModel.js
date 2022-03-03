const { Reviewed_models } = require("../../models");

module.exports = {
  getModels: async (req, res) => {
    try {
      const models = await Reviewed_models.findAll({
        order: [["building", "ASC"]],
      });

      return res.json(models);
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  },

  postModel: async (req, res) => {
    const { building, meter } = req.body;
    const reviewed_by = req.user.email;
    try {
      const postModels = await Reviewed_models.create({
        building,
        meter,
        reviewed_by,
      });
      return res.json(postModels)
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  },

  deleteModels: async (req, res) => {
      try {
          await Reviewed_models.destroy({
              truncate: true
          })
      } catch (error) {
        console.error(error);
        return res.json(error);
      }
  }
};
