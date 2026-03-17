import { PublicAPI } from './api';
import { PublicCollege, PublicCollegeFilters } from '@/types/public';

// API Functions
export const getPublicColleges = (params?: PublicCollegeFilters) =>
  PublicAPI.get('/colleges', { params });

export const getPublicCollege = (id: string) =>
  PublicAPI.get(`/colleges/${id}`);

// Service Functions
export const fetchPublicColleges = async (filters?: PublicCollegeFilters) => {
  const response = await getPublicColleges(filters);
  return response.data;
};

export const fetchPublicCollege = async (id: string): Promise<PublicCollege> => {
  const response = await getPublicCollege(id);
  return response.data.college;
};
