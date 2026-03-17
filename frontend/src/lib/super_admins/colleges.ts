import { SuperAdminAPI } from './api';
import { SuperAdminCollege, SuperAdminCollegeCreateData, SuperAdminCollegeUpdateData, SuperAdminCollegeFilters } from '@/types/super_admins';

// API Functions
export const getColleges = (params?: SuperAdminCollegeFilters) =>
  SuperAdminAPI.get('/colleges', { params });

export const getCollege = (id: string) =>
  SuperAdminAPI.get(`/colleges/${id}`);

export const createCollege = (data: SuperAdminCollegeCreateData) =>
  SuperAdminAPI.post('/colleges', data);

export const updateCollege = (id: string, data: SuperAdminCollegeUpdateData) =>
  SuperAdminAPI.put(`/colleges/${id}`, data);

export const deleteCollege = (id: string) =>
  SuperAdminAPI.delete(`/colleges/${id}`);

// Service Functions
export const fetchColleges = async (filters?: SuperAdminCollegeFilters) => {
  const response = await getColleges(filters);
  return response.data;
};

export const fetchCollege = async (id: string): Promise<SuperAdminCollege> => {
  const response = await getCollege(id);
  return response.data.college;
};

export const addCollege = async (data: SuperAdminCollegeCreateData) => {
  const response = await createCollege(data);
  return response.data;
};

export const editCollege = async (id: string, data: SuperAdminCollegeUpdateData) => {
  const response = await updateCollege(id, data);
  return response.data;
};

export const removeCollege = async (id: string) => {
  await deleteCollege(id);
};
