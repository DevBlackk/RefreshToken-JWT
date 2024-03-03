import { hash } from 'bcryptjs'

import { client } from '../../prisma/client'

interface IUserRequest {
  name: string
  password: string
  username: string
}

class CreateUserUserCase {

  async execute({name, password, username }: IUserRequest) {
    // Verificar se usuário existe
    const userAlreadyExist = await client.user.findFirst({
      where: {
        username
      }
    })

    if (userAlreadyExist) {
      throw new Error("User already exists!")
    }

    // Cadastra o usuário

    const passwordHash = await hash(password, 8)

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash
      }
    })

    return user
  }
}

export { CreateUserUserCase }