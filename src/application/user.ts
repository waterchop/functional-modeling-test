import { User, UserRepository } from "../domain/user";

export const createUser = (repo: UserRepository) => async (name: string): Promise<User> => {
  return repo.create({ name });
};

export const getUser = (repo: UserRepository) => async (id: string): Promise<User | null> => {
  return repo.findById(id);
};

export const updateUser = (repo: UserRepository) => async (
  id: string,
  data: Partial<Omit<User, "id">>
): Promise<User | null> => {
  return repo.update(id, data);
};

export const deleteUser = (repo: UserRepository) => async (id: string): Promise<void> => {
  return repo.delete(id);
};

export const listUsers = (repo: UserRepository) => async (): Promise<User[]> => {
  return repo.findAll();
};
