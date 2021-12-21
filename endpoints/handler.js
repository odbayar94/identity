import { User } from "../common/models/User";
import generateResponse from "../common/response";
import saveUserInfo from "./services/saveUserInfo";
import textract from "./services/textract";

export async function api(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const functionName = event.pathParameters.functionName;

    if (functionName === "textract") {
       return await textract({ event });
     }
    if (functionName === "saveUserInfo") {
      return await saveUserInfo({ event });
    }

  } catch (error) {
    return error;
  }
}
