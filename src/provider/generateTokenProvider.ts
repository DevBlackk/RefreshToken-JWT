import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "d51731f1-4013-4a5c-afd8-e308fd3d75f7", {
      subject: userId,
      expiresIn: "20s",
    });

    return token;
  }
}

export { GenerateTokenProvider };
