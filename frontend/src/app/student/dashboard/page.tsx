"use client";

import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  School as CoursesIcon,
  HowToReg as AttendanceIcon,
  LibraryBooks as BooksIcon,
  AccountBalanceWallet as FeesIcon,
} from '@mui/icons-material';
import { Layout } from '@/components/Layout';
import { AuthGuard } from '@/components/AuthGuard';
import { fetchStudentDashboard, StudentDashboardData } from '@/lib/students/dashboard';

export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchStudentDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <AuthGuard>
        <Layout>
          <Box>Loading...</Box>
        </Layout>
      </AuthGuard>
    );
  }

  if (!dashboardData) {
    return (
      <AuthGuard>
        <Layout>
          <Box>Failed to load dashboard data</Box>
        </Layout>
      </AuthGuard>
    );
  }

  const statsCards = [
    {
      title: 'My Courses',
      value: dashboardData.stats.my_courses,
      icon: <CoursesIcon fontSize="large" color="primary" />,
      color: '#1976d2',
    },
    {
      title: 'My Attendance',
      value: dashboardData.stats.my_attendance,
      icon: <AttendanceIcon fontSize="large" color="success" />,
      color: '#2e7d32',
    },
    {
      title: 'My Books',
      value: dashboardData.stats.my_books,
      icon: <BooksIcon fontSize="large" color="warning" />,
      color: '#ed6c02',
    },
    {
      title: 'Pending Fees',
      value: dashboardData.stats.pending_fees,
      icon: <FeesIcon fontSize="large" color="error" />,
      color: '#d32f2f',
    },
  ];

  return (
    <AuthGuard>
      <Layout>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Student Dashboard
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statsCards.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderLeft: `4px solid ${stat.color}`,
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                <List>
                  {dashboardData.recent_activities.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={activity} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </AuthGuard>
  );
}
