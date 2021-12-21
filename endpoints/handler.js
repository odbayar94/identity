import { User } from "../common/models/User";
import generateResponse from "../common/response";
import uploadImage from "./services/uploadImage";

export async function api(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const functionName = event.pathParameters.functionName;

    if (functionName === "uploadImage") {
      return await uploadImage({ event });
    }

  } catch (error) {
    return error;
  }
}
