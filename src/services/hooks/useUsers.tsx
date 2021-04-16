import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user: User) => {
    return {
      ...user,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  });
  
  return {
    totalCount,
    users,
  };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 5, // 5 SECONDS
  });
}