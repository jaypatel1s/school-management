import { PrincipalAPI } from './api';
import { Fee, FeeCreateData, FeeUpdateData, FeeFilters } from '@/types/principals';

// API Functions
export const getFees = (params?: FeeFilters) =>
  PrincipalAPI.get('/fees', { params });

export const getFee = (id: string) =>
  PrincipalAPI.get(`/fees/${id}`);

export const createFee = (data: FeeCreateData) =>
  PrincipalAPI.post('/fees', data);

export const updateFee = (id: string, data: FeeUpdateData) =>
  PrincipalAPI.put(`/fees/${id}`, data);

export const deleteFee = (id: string) =>
  PrincipalAPI.delete(`/fees/${id}`);

export const getFeeCollectionReport = (params?: FeeFilters) =>
  PrincipalAPI.get('/fees/collection_report', { params });

// Service Functions
export const fetchFees = async (filters?: FeeFilters) => {
  const response = await getFees(filters);
  return response.data;
};

export const fetchFee = async (id: string): Promise<Fee> => {
  const response = await getFee(id);
  return response.data.fee;
};

export const addFee = async (data: FeeCreateData) => {
  const response = await createFee(data);
  return response.data;
};

export const editFee = async (id: string, data: FeeUpdateData) => {
  const response = await updateFee(id, data);
  return response.data;
};

export const removeFee = async (id: string) => {
  await deleteFee(id);
};

export const fetchFeeCollectionReport = async (params?: any) => {
  const response = await getFeeCollectionReport(params);
  return response.data;
};
