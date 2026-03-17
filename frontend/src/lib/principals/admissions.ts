import { PrincipalAPI } from './api';
import { Admission, AdmissionCreateData, AdmissionUpdateData, AdmissionFilters } from '@/types/principals';

// API Functions
export const getAdmissions = (params?: AdmissionFilters) =>
  PrincipalAPI.get('/admissions', { params });

export const getAdmission = (id: string) =>
  PrincipalAPI.get(`/admissions/${id}`);

export const createAdmission = (data: AdmissionCreateData) =>
  PrincipalAPI.post('/admissions', data);

export const updateAdmission = (id: string, data: AdmissionUpdateData) =>
  PrincipalAPI.put(`/admissions/${id}`, data);

export const deleteAdmission = (id: string) =>
  PrincipalAPI.delete(`/admissions/${id}`);

export const approveAdmission = (id: string) =>
  PrincipalAPI.post(`/admissions/${id}/approve`);

export const rejectAdmission = (id: string) =>
  PrincipalAPI.post(`/admissions/${id}/reject`);

// Service Functions
export const fetchAdmissions = async (filters?: AdmissionFilters) => {
  const response = await getAdmissions(filters);
  return response.data;
};

export const fetchAdmission = async (id: string): Promise<Admission> => {
  const response = await getAdmission(id);
  return response.data.admission;
};

export const addAdmission = async (data: AdmissionCreateData) => {
  const response = await createAdmission(data);
  return response.data;
};

export const editAdmission = async (id: string, data: AdmissionUpdateData) => {
  const response = await updateAdmission(id, data);
  return response.data;
};

export const removeAdmission = async (id: string) => {
  await deleteAdmission(id);
};

export const approveAdmissionRequest = async (id: string) => {
  const response = await approveAdmission(id);
  return response.data;
};

export const rejectAdmissionRequest = async (id: string) => {
  const response = await rejectAdmission(id);
  return response.data;
};
