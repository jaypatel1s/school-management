"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Pagination,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Layout } from '@/components/Layout';
import { AuthGuard } from '@/components/AuthGuard';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Actions } from '@/components/common/Actions';
import { Modal } from '@/components/common/Modal';
import { fetchSemesters, Semester, SemesterFilters } from '@/lib/principals/semesters';

export default function SemestersPage() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);

  useEffect(() => {
    loadSemesters();
  }, []);

  const loadSemesters = async (page = 1) => {
    setLoading(true);
    try {
      const filters: SemesterFilters = { page, per_page: 10 };
      const response = await fetchSemesters(filters);
      setSemesters(response.semesters);
      setPagination(response.pagy);
    } catch (error) {
      console.error('Failed to load semesters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    loadSemesters(value);
  };

  const handleEdit = (semester: Semester) => {
    setEditingSemester(semester);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this semester?')) {
      try {
        // await removeSemester(id);
        loadSemesters(pagination.current_page);
      } catch (error) {
        console.error('Failed to delete semester:', error);
      }
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/principal/dashboard' },
    { label: 'Semesters' },
  ];

  const getStatusColor = (semester: Semester) => {
    if (semester.completed) return 'error';
    if (semester.active) return 'success';
    return 'default';
  };

  const getStatusText = (semester: Semester) => {
    if (semester.completed) return 'Completed';
    if (semester.active) return 'Active';
    return 'Upcoming';
  };

  return (
    <AuthGuard>
      <Layout>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumb
            items={breadcrumbItems}
            actions={
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setModalOpen(true)}
              >
                Add Semester
              </Button>
            }
          />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Courses</TableCell>
                    <TableCell>Students</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semesters.map((semester) => (
                    <TableRow key={semester.id}>
                      <TableCell>{semester.name}</TableCell>
                      <TableCell>
                        {new Date(semester.start_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(semester.end_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{semester.courses_count}</TableCell>
                      <TableCell>{semester.students_count}</TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusText(semester)}
                          color={getStatusColor(semester) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Actions
                          id={semester.id}
                          viewPath={`/principal/semesters/${semester.id}`}
                          editPath={`/principal/semesters/${semester.id}/edit`}
                          onDelete={handleDelete}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Pagination
                count={pagination.total_pages}
                page={pagination.current_page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Paper>

          <Modal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEditingSemester(null);
            }}
            title={editingSemester ? 'Edit Semester' : 'Add Semester'}
            breadcrumbItems={[{ label: 'Semesters' }, { label: editingSemester ? 'Edit' : 'Add' }]}
          >
            <Typography>Semester form will go here</Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="contained">
                {editingSemester ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Modal>
        </Box>
      </Layout>
    </AuthGuard>
  );
}
