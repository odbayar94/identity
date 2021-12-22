'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_BUCKET_REGION });
import generateResponse from "../../common/response";
const textract = new AWS.Textract();

var findArray;

export default async function ({ event }) {

  let { JobId } = JSON.parse(event.body);
  console.log(JobId);

  let response = {};
  do {
    await sleep(1000);
    response = await textract
      .getDocumentAnalysis({
        JobId,
        MaxResults: 1,
      })
      .promise();
  } while (response.JobStatus == "IN_PROGRESS");

  let Blocks = [...response.Blocks];

  do {
    response = await textract
      .getDocumentAnalysis({
        JobId,
        NextToken: response.NextToken,
      })
      .promise();
    Blocks = Blocks.concat(response.Blocks);
  } while (response.NextToken);
  
  findArray = Blocks;
  const firstName = firstNameFind();
  console.log(firstName);
  if (!firstName) {
    return generateResponse(200, {
      status: false,
      userInfo: {},
    });
  }
  // # All Text By Line
  return generateResponse(200, {
    status: true,
    userInfo: {
      firstName,
      lastName: searchData("WORD", "Surname", 1),
      stateRegNumber: searchData("WORD", "number", 3),
    },
  });
 
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function firstNameFind() {
  const firstNameObj = findArray.find(
    (element) =>
      element.BlockType === "LINE" &&
      element.Text.slice(4, element.Text.length) === "Given name"
  );
  if (firstNameObj) {
    const firstNameIndex = findArray.indexOf(firstNameObj);

    return findArray[firstNameIndex + 2].Text;
  } else {
    return false;
  }
}

function searchData(type, text, afterIndex) {
  const obj = findArray.find(
    (element) => element.BlockType === type && element.Text === text
  );

  const index = findArray.indexOf(obj);

  return findArray[index + afterIndex].Text;
}