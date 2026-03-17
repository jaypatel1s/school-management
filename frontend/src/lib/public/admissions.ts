import { PublicAPI } from './api';
import { PublicAdmission, PublicAdmissionCreateData, PublicAdmissionFilters } from '@/types/public';

// API Functions
export const getPublicAdmissions = (params?: PublicAdmissionFilters) =
  PublicAPI.get('/admissions', { params });

export const getPublicAdmission = (id: string) =
  PublicAPI.get(`/admissions/${id}`);

export const createPublicAdmission = (data: PublicAdmissionCreateData) =
  PublicAPI.post('/admissions', data);

// Service Functions
export const fetchPublicAdmissions = async (filters?: PublicAdmissionFilters) => {
  const response = await getPublicAdmissions(filters);
  return response.data;
};

export const fetchPublicAdmission = async (id: string): Promise<PublicAdmission> => {
  const response = await getPublicAdmission(id);
  return response.data.admission;
};

export const addPublicAdmission = async (data: PublicAdmissionCreateData) => {
  const response = await createPublicAdmission(data);
  return response.data;
};
