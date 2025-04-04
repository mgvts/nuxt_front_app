// composables/useUsers.ts
import type { User } from '~/types/user';
import { useApi } from './useApi';

export function useUsers() {
  const { data: users, error, refresh } = useApi<User[]>('/api/users');
  const fetchUserById = (id: User['id']) => useApi<User>(`/api/users/${id}`).data;

  return { users, error, refresh, fetchUserById };
}
