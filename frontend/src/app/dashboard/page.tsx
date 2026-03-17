'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  People,
  Book,
  School,
  Assessment,
  MenuBook,
  AttachMoney,
} from '@mui/icons-material';
import api from '@/lib/api';
import { DashboardData } from '@/types';
import AuthGuard from '@/components/AuthGuard';
import Layout from '@/components/Layout';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatIcon = (key: string) => {
    switch (key) {
      case 'total_students':
      case 'total_users':
        return <People color="primary" />;
      case 'total_teachers':
        return <School color="secondary" />;
      case 'total_courses':
      case 'my_courses':
        return <Assessment color="success" />;
      case 'total_books':
      case 'my_books':
        return <Book color="info" />;
      case 'books_issued':
        return <MenuBook color="warning" />;
      case 'pending_fees':
        return <AttachMoney color="error" />;
      default:
        return <Assessment />;
    }
  };

  const getStatLabel = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <AuthGuard>
        <Layout>
          <Box>Loading dashboard...</Box>
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

  return (
    <AuthGuard>
      <Layout>
        <Box>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          
          <Grid container spacing={3}>
            {Object.entries(dashboardData.stats).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Box mr={2}>
                        {getStatIcon(key)}
                      </Box>
                      <Box>
                        <Typography variant="h6">
                          {value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getStatLabel(key)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
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
