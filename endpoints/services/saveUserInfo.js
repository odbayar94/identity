import { User } from "../../common/models/User";
import { HTTP_ERROR_400, HTTP_ERROR_403 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";

export default async function ({ event }) {
  const requestBody = event && event.body ? JSON.parse(event.body) : {};
  try {
    await connectDb();
    const {email, firstName, lastName, stateRegNumber,avatar} = requestBody;
    
    try {
      const existingUser = await User.findOne({
        email: email
      }).lean();

      // If user with given email exists, it should return 403
      if (existingUser) {
        return generateResponse(403, {
          message: "User exists",
        });
      }
    } catch (e) {
      console.log("error during selecting from mongodb", e);
    }
    const user = await User.create({
      email,
      firstName,
      lastName,
      stateRegNumber,
      avatar
    });

    return generateResponse(201, {
      message: "User created",
    });
  } catch (e) {
    console.log(e);
    throw HTTP_ERROR_400;
  }
}
