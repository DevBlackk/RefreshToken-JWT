import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/generateRefreshToken";
import { GenerateTokenProvider } from "../../provider/generateTokenProvider";

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    // Verificar se o usuário existe

    const userAlreadyExist = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!userAlreadyExist) {
      throw new Error("User or password incorrect.");
    }

    // Verifocar se a senha está correta

    const passwordMatch = await compare(password, userAlreadyExist.password);
    if (!passwordMatch) {
      throw new Error("User or password incorrect.");
    }

    // Gerar token do usuário
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExist.id);

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExist.id
      }
    })

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = generateRefreshToken.execute(userAlreadyExist.id);

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
