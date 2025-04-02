import type { User } from '~/types/user';
import { useApi } from './useApi';

export function useUsers() {
  const fetchUsers = () => useApi<User[]>('/api/users').data;
  const fetchUserById = (id: User['id']) => useApi<User>(`/api/users/${id}`).data;

  return { fetchUsers, fetchUserById };
}