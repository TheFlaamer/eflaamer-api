import { ObjectId } from "mongoose";
import {decode, sign} from "../../services/v1/jwt"

class GenerateAuthToken {
  async generate(_id: ObjectId | undefined): Promise<string> {

    const token = sign({id: _id})

    return token;
  }
}

export { GenerateAuthToken };