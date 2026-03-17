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
  People as StudentsIcon,
  School as TeachersIcon,
  Book as BooksIcon,
  Assignment as CoursesIcon,
  LibraryBooks as BooksIssuedIcon,
} from '@mui/icons-material';
import { Layout } from '@/components/Layout';
import { AuthGuard } from '@/components/AuthGuard';
import { fetchPrincipalDashboard, PrincipalDashboardData } from '@/lib/principals/dashboard';

export default function PrincipalDashboard() {
  const [dashboardData, setDashboardData] = useState<PrincipalDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchPrincipalDashboard();
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
      title: 'Total Students',
      value: dashboardData.stats.total_students,
      icon: <StudentsIcon fontSize="large" color="primary" />,
      color: '#1976d2',
    },
    {
      title: 'Total Teachers',
      value: dashboardData.stats.total_teachers,
      icon: <TeachersIcon fontSize="large" color="success" />,
      color: '#2e7d32',
    },
    {
      title: 'Total Courses',
      value: dashboardData.stats.total_courses,
      icon: <CoursesIcon fontSize="large" color="warning" />,
      color: '#ed6c02',
    },
    {
      title: 'Total Books',
      value: dashboardData.stats.total_books,
      icon: <BooksIcon fontSize="large" color="info" />,
      color: '#0288d1',
    },
    {
      title: 'Books Issued',
      value: dashboardData.stats.books_issued,
      icon: <BooksIssuedIcon fontSize="large" color="secondary" />,
      color: '#9c27b0',
    },
  ];

  return (
    <AuthGuard>
      <Layout>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Principal Dashboard
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
