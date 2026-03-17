import { StudentAPI } from './api';
import { StudentAssignment, StudentAssignmentFilters } from '@/types/students';

// API Functions
export const getStudentAssignments = (params?: StudentAssignmentFilters) =>
  StudentAPI.get('/assignments', { params });

export const getStudentAssignment = (id: string) =>
  StudentAPI.get(`/assignments/${id}`);

// Service Functions
export const fetchStudentAssignments = async (filters?: StudentAssignmentFilters) => {
  const response = await getStudentAssignments(filters);
  return response.data;
};

export const fetchStudentAssignment = async (id: string): Promise<StudentAssignment> => {
  const response = await getStudentAssignment(id);
  return response.data.assignment;
};
