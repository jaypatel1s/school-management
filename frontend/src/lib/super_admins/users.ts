import { SuperAdminAPI } from './api';
import { SuperAdminUser, SuperAdminUserCreateData, SuperAdminUserUpdateData, SuperAdminUserFilters } from '@/types/super_admins';

// API Functions
export const getUsers = (params?: SuperAdminUserFilters) =>
  SuperAdminAPI.get('/users', { params });

export const getUser = (id: string) =>
  SuperAdminAPI.get(`/users/${id}`);

export const createUser = (data: SuperAdminUserCreateData) =>
  SuperAdminAPI.post('/users', data);

export const updateUser = (id: string, data: SuperAdminUserUpdateData) =>
  SuperAdminAPI.put(`/users/${id}`, data);

export const deleteUser = (id: string) =>
  SuperAdminAPI.delete(`/users/${id}`);

// Service Functions
export const fetchUsers = async (filters?: SuperAdminUserFilters) => {
  const response = await getUsers(filters);
  return response.data;
};

export const fetchUser = async (id: string): Promise<SuperAdminUser> => {
  const response = await getUser(id);
  return response.data.user;
};

export const addUser = async (data: SuperAdminUserCreateData) => {
  const response = await createUser(data);
  return response.data;
};

export const editUser = async (id: string, data: SuperAdminUserUpdateData) => {
  const response = await updateUser(id, data);
  return response.data;
};

export const removeUser = async (id: string) => {
  await deleteUser(id);
};
