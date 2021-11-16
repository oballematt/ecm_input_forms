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

    getAllMeters: async (req, res) => {
        try {

            let allResults = await athenaExpress.query(`SELECT * FROM ${process.env.ATHENA_TABLE} ORDER BY ${process.env.ORDER1}, ${process.env.ORDER2}`)

            return res.json(allResults)
            
        } catch (error) {
            console.error(error.message)
        }
        
    }
}
