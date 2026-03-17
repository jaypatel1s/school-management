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
  Assignment as AssignmentsIcon,
  People as StudentsIcon,
  PendingActions as PendingIcon,
  Event as ClassesIcon,
} from '@mui/icons-material';
import { Layout } from '@/components/Layout';
import { AuthGuard } from '@/components/AuthGuard';
import { fetchTeacherDashboard, TeacherDashboardData } from '@/lib/teachers/dashboard';

export default function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState<TeacherDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchTeacherDashboard();
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
      title: 'My Assignments',
      value: dashboardData.stats.my_assignments,
      icon: <AssignmentsIcon fontSize="large" color="success" />,
      color: '#2e7d32',
    },
    {
      title: 'My Students',
      value: dashboardData.stats.my_students,
      icon: <StudentsIcon fontSize="large" color="warning" />,
      color: '#ed6c02',
    },
    {
      title: 'Pending Submissions',
      value: dashboardData.stats.pending_submissions,
      icon: <PendingIcon fontSize="large" color="error" />,
      color: '#d32f2f',
    },
    {
      title: "Today's Classes",
      value: dashboardData.stats.today_classes,
      icon: <ClassesIcon fontSize="large" color="info" />,
      color: '#0288d1',
    },
  ];

  return (
    <AuthGuard>
      <Layout>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Teacher Dashboard
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
