'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_BUCKET_REGION });
import generateResponse from "../../common/response";
const textract = new AWS.Textract();

var findArray;

export default async function ({ event }) {

  let { imageName } = JSON.parse(event.body);

  const ttparams = {
    DocumentLocation: {
      S3Object: { Bucket: process.env.AWS_BUCKET_NAME, Name: imageName },
    },
    FeatureTypes: ["FORMS"],
  };

  const analysis = await textract.startDocumentAnalysis(ttparams).promise();
  const JobId = analysis.JobId;

   return generateResponse(200, {
     status: true,
     JobId
   });
 
};