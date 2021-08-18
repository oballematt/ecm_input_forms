require('dotenv').config()

const AthenaExpress = require("athena-express"),
    aws = require("aws-sdk"),
    awsCredentials = {
        region: process.env.REGION,
        accessKeyId: process.env.ACCESSKEY,
        secretAccessKey: process.env.SECRETACCESSKEY
    };

aws.config.update(awsCredentials);

//AthenaExpress config object
const athenaExpressConfig = {
    aws, /* required */
    // s3: process.env.S3BUCKET, /* optional */
    db: process.env.ATHENADB, /* optional */
    formatJson: true, /* optional default=true */
    retry: 200, /* optional default=200 */
    getStats: false /* optional default=false */
}


//Initializing AthenaExpress
const athenaExpress = new AthenaExpress(athenaExpressConfig);

module.exports = {

    getData: async (req, res) => {
        const { building_abbreviation, commodity_tag } = req.body
        try {
            let results = await athenaExpress.query(`SELECT * FROM building_meter_metadata WHERE building_abbreviation = '${building_abbreviation}' AND commodity_tag = '${commodity_tag}' ORDER BY building_abbreviation`)
            console.log(results)
            return res.json(results)
        } catch (error) {
            console.log(error)
        }
    }
}
