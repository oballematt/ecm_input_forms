require("dotenv").config();
const { Model_api_authorization } = require("../../models");
const axios = require("axios").default;
module.exports = {
  getModel: async (req, res) => {
    const {
      buildingNumber,
      commodity,
      meter,
      trainStart,
      trainEnd,
      analysisStart,
      analysisEnd,
    } = req.query;
    const email = req.user.email;

    try {
      const token = await Model_api_authorization.findOne({
        where: {
          email: email,
        },
        attributes: ["token"],
      });

      const config = {
        headers: {
          authorizationToken: token.token,
        },
      };
      const model =
        process.env.GET_MODEL_URL +
        `building_number=${buildingNumber}&commodity_tag=${commodity}&meter=${meter}&train_start=${trainStart}&train_end=${trainEnd}&analysis_start=${analysisStart}&analysis_end=${analysisEnd}`;
      const response = await axios.get(model, config);
      return res.json(response.data);
    } catch (error) {
      console.error(error.message);
      return res.json(error.message);
    }
  },

  postReplacement: async (req, res) => {
    const {
      building_number,
      commodity_tag,
      meter,
      timestamp,
      values,
      reason,
      notes,
    } = req.body;
    const email = req.user.email;

    try {
      const token = await Model_api_authorization.findOne({
        where: {
          email: email,
        },
        attributes: ["token"],
      });

      const headers = {
        "Content-Type": "application/json",
        authorizationToken: token.token,
      };

      const postdata = JSON.stringify({
        analyst: email,
        building_number: building_number,
        commodity_tag: commodity_tag,
        meter: meter,
        data: {
          timestamp: JSON.parse(timestamp),
          value: JSON.parse(values),
          reason: JSON.parse(reason),
          notes: JSON.parse(notes),
        },
      });

      const postReplacement = process.env.POST_REPLACEMENT_URL;

      const response = await axios.post(postReplacement, postdata, {
        headers: headers,
      });

      return res.json(response.data);
    } catch (error) {
      console.error(error.message);
      return res.json(error.message);
    }
  },

  postAttributes: async (req, res) => {
    const email = req.user.email;
    let {
      building_number,
      meter,
      commodity_tag,
      train_start,
      train_end,
      x,
      auto_ignored_percentage,
      base_temperature,
      r2,
      slope,
      intercept,
      std,
    } = req.body;
    try {
      const token = await Model_api_authorization.findOne({
        where: {
          email: email,
        },
        attributes: ["token"],
      });

      const headers = {
        "Content-Type": "application/json",
        authorizationToken: token.token,
      };

      const attrdata = JSON.stringify({
        building_number: building_number,
        meter: meter,
        commodity_tag: commodity_tag,
        train_start: train_start,
        train_end: train_end,
        x: x.toLowerCase(),
        auto_ignored_percentage: Number(auto_ignored_percentage),
        base_temperature:
          Number(base_temperature) === "--" ? null : Number(base_temperature),
        r2: Number(r2),
        slope: Number(slope),
        intercept: Number(intercept),
        std: Number(std),
      });
      const postattributes = process.env.POST_ATTR_URL;

      const response = await axios.post(postattributes, attrdata, {
        headers: headers,
      });

      return res.json(response.data);
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  },

  getConsumption: async (req, res) => {
    try {
      const {
        buildingNumber,
        commodity,
        meter,
        endTimestamp,
        startTimestamp,
      } = req.query;
      const email = req.user.email;

      const token = await Model_api_authorization.findOne({
        where: {
          email: email,
        },
        attributes: ["token"],
      });

      const config = {
        headers: {
          authorizationToken: token.token,
        },
      };

      const consumption =
        process.env.GET_CONSUMPTION_URL +
        `building_number=${buildingNumber}&commodity_tag=${commodity}&meter=${meter}&start_timestamp=${startTimestamp}&end_timestamp=${endTimestamp}`;
      const response = await axios.get(consumption, config);
      return res.json(response.data);
    } catch (error) {
      console.error(error.message);
      return res.json(error.message);
    }
  },

  getMeterAlarm: async (req, res) => {
    const { endTimestamp, startTimestamp, steward } = req.body;
    const email = req.user.email;
    try {
      if (!steward || steward === "All") {
        const token = await Model_api_authorization.findOne({
          where: {
            email: email,
          },
          attributes: ["token"],
        });

        const config = {
          headers: {
            authorizationToken: token.token,
          },
        };

        const meterAlarm =
          process.env.GET_METER_ALARM_URL +
          `end_timestamp=${endTimestamp}&start_timestamp=${startTimestamp}`;
        const response = await axios.get(meterAlarm, config);

        return res.json(response.data);
      } else {
        const email = req.user.email;

        const token = await Model_api_authorization.findOne({
          where: {
            email: email,
          },
          attributes: ["token"],
        });

        const config = {
          headers: {
            authorizationToken: token.token,
          },
        };

        const meterAlarm =
          process.env.GET_METER_ALARM_URL +
          `end_timestamp=${endTimestamp}&start_timestamp=${startTimestamp}&steward_email=${steward}`;
        const response = await axios.get(meterAlarm, config);

        return res.json(response.data);
      }
    } catch (error) {
      console.error(error.message);
      return res.json(error.message);
    }
  },

  postModelNotes: async (req, res) => {
    const { building_number, meter, notes } = req.body;
    const email = req.user.email;
    try {
      const token = await Model_api_authorization.findOne({
        where: {
          email: email,
        },
        attributes: ["token"],
      });

      const headers = {
        "Content-Type": "application/json",
        authorizationToken: token.token,
      };

      const modelNotesData = {
        data: {
          building_number: JSON.parse(building_number),
          meter: JSON.parse(meter),
          notes: JSON.parse(notes),
        },
      };

      const modelNotes = process.env.POST_MODEL_NOTES;

      const response = await axios.post(modelNotes, modelNotesData, {
        headers: headers,
      });

      return res.json(response.data);
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  },
};
