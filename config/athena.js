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
	s3: process.env.S3BUCKET, /* optional */
    db: process.env.ATHENADB, /* optional */
	formatJson: BOOLEAN, /* optional default=true */
	retry: Integer, /* optional default=200 */
    getStats: BOOLEAN /* optional default=false */
}


//Initializing AthenaExpress
 const athenaExpress = new AthenaExpress(athenaExpressConfig);