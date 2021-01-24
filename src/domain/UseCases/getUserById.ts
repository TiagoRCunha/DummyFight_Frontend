import { User } from "../Entities";
import { UserRepository } from "../Repository/UserRepository";

export interface getUserByIdUseCase {
  getUserById(id: string): Promise<User>;
}

export class getUserByIdUseCaseImpl implements getUserByIdUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async getUserById(id: string): Promise<User> {
    return this.repository.getUser(id);
  }
}
