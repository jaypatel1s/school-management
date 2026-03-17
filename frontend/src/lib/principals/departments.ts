import { PrincipalAPI } from './api';
import { Department, DepartmentCreateData, DepartmentUpdateData, DepartmentFilters } from '@/types/principals';

// API Functions
export const getDepartments = (params?: DepartmentFilters) =>
  PrincipalAPI.get('/departments', { params });

export const getDepartment = (id: string) =>
  PrincipalAPI.get(`/departments/${id}`);

export const createDepartment = (data: DepartmentCreateData) =>
  PrincipalAPI.post('/departments', data);

export const updateDepartment = (id: string, data: DepartmentUpdateData) =>
  PrincipalAPI.put(`/departments/${id}`, data);

export const deleteDepartment = (id: string) =>
  PrincipalAPI.delete(`/departments/${id}`);

// Service Functions
export const fetchDepartments = async (filters?: DepartmentFilters) => {
  const response = await getDepartments(filters);
  return response.data;
};

export const fetchDepartment = async (id: string): Promise<Department> => {
  const response = await getDepartment(id);
  return response.data.department;
};

export const addDepartment = async (data: DepartmentCreateData) => {
  const response = await createDepartment(data);
  return response.data;
};

export const editDepartment = async (id: string, data: DepartmentUpdateData) => {
  const response = await updateDepartment(id, data);
  return response.data;
};

export const removeDepartment = async (id: string) => {
  await deleteDepartment(id);
};
