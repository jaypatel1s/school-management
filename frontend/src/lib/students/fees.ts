import { StudentAPI } from './api';
import { StudentFee, StudentFeeFilters } from '@/types/students';

// API Functions
export const getStudentFees = (params?: StudentFeeFilters) =>
  StudentAPI.get('/fees', { params });

export const getStudentFee = (id: string) =>
  StudentAPI.get(`/fees/${id}`);

export const getStudentFeeSummary = () =>
  StudentAPI.get('/fees/summary');

// Service Functions
export const fetchStudentFees = async (filters?: StudentFeeFilters) => {
  const response = await getStudentFees(filters);
  return response.data;
};

export const fetchStudentFee = async (id: string): Promise<StudentFee> => {
  const response = await getStudentFee(id);
  return response.data.fee;
};

export const fetchStudentFeeSummary = async () => {
  const response = await getStudentFeeSummary();
  return response.data;
};
