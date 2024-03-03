import { Request, Response } from 'express'
import { CreateUserUserCase } from './CreateUserUseCase'

class CreateUserController {

  async handle(request: Request, response: Response) {
    const { username, name, password } = request.body

    const createUserUseCase = new CreateUserUserCase

    const user = await createUserUseCase.execute({
      username,
      name,
      password,
    })

    return response.json(user)
  }
}

export { CreateUserController }