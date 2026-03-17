"use client";

import { useEffect, useState } from 'react';
import {
  Box,
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
import { Layout } from '@/components/Layout';
import { AuthGuard } from '@/components/AuthGuard';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Actions } from '@/components/common/Actions';
import { fetchTeacherCourses, TeacherCourse } from '@/lib/teachers/semesters';

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchTeacherCourses({ page, per_page: 10 });
      setCourses(response.courses);
      setPagination(response.pagy);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    loadCourses(value);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/teacher/dashboard' },
    { label: 'Courses' },
  ];

  return (
    <AuthGuard>
      <Layout>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumb items={breadcrumbItems} />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Credits</TableCell>
                    <TableCell>Students</TableCell>
                    <TableCell>Sessions</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>{course.students_count}</TableCell>
                      <TableCell>{course.sessions_count}</TableCell>
                      <TableCell>
                        <Actions
                          id={course.id}
                          viewPath={`/teacher/courses/${course.id}`}
                          editPath={`/teacher/courses/${course.id}/edit`}
                          showDelete={false}
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
        </Box>
      </Layout>
    </AuthGuard>
  );
}
