import { PrincipalAPI } from './api';
import { Assignment, AssignmentCreateData, AssignmentUpdateData, AssignmentFilters } from '@/types/principals';

// API Functions
export const getAssignments = (params?: AssignmentFilters) =>
  PrincipalAPI.get('/assignments', { params });

export const getAssignment = (id: string) =>
  PrincipalAPI.get(`/assignments/${id}`);

export const createAssignment = (data: AssignmentCreateData) =>
  PrincipalAPI.post('/assignments', data);

export const updateAssignment = (id: string, data: AssignmentUpdateData) =>
  PrincipalAPI.put(`/assignments/${id}`, data);

export const deleteAssignment = (id: string) =>
  PrincipalAPI.delete(`/assignments/${id}`);

// Service Functions
export const fetchAssignments = async (filters?: AssignmentFilters) => {
  const response = await getAssignments(filters);
  return response.data;
};

export const fetchAssignment = async (id: string): Promise<Assignment> => {
  const response = await getAssignment(id);
  return response.data.assignment;
};

export const addAssignment = async (data: AssignmentCreateData) => {
  const response = await createAssignment(data);
  return response.data;
};

export const editAssignment = async (id: string, data: AssignmentUpdateData) => {
  const response = await updateAssignment(id, data);
  return response.data;
};

export const removeAssignment = async (id: string) => {
  await deleteAssignment(id);
};
