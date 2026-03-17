'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Book as BookIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { libraryService } from '@/services/libraryService';
import { Book, BookIssue } from '@/types';
import AuthGuard from '@/components/AuthGuard';
import Layout from '@/components/Layout';

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookIssues, setBookIssues] = useState<BookIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'books' | 'issues'>('books');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksResponse, issuesResponse] = await Promise.all([
        libraryService.getBooks(),
        libraryService.getBookIssues(),
      ]);
      setBooks(booksResponse.books);
      setBookIssues(issuesResponse.book_issues);
    } catch (error) {
      console.error('Failed to fetch library data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = () => {
    setEditingBook(null);
    setOpenDialog(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setOpenDialog(true);
  };

  const handleDeleteBook = async (slug: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await libraryService.deleteBook(slug);
        fetchData();
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  const bookColumns: GridColDef[] = [
    { field: 'name', headerName: 'Book Name', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'total_copies', headerName: 'Total Copies', width: 120 },
    { field: 'available_copies', headerName: 'Available', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleEditBook(params.row)}>
            <Edit />
          </IconButton>
          <IconButton size="small" onClick={() => handleDeleteBook(params.row.slug)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  const issueColumns: GridColDef[] = [
    { field: 'book_name', headerName: 'Book Name', flex: 1, valueGetter: (params) => params.row.book?.name },
    { field: 'student_name', headerName: 'Student', flex: 1, valueGetter: (params) => params.row.student?.name },
    { field: 'issue_date', headerName: 'Issue Date', flex: 1 },
    { field: 'due_date', headerName: 'Due Date', flex: 1 },
    { field: 'return_date', headerName: 'Return Date', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.row.return_date ? 'success.main' : 'warning.main',
            fontWeight: 'bold'
          }}
        >
          {params.row.return_date ? 'Returned' : 'Issued'}
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <AuthGuard>
        <Layout>
          <Box>Loading library data...</Box>
        </Layout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <Layout>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Library Management</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreateBook}
              disabled={activeTab !== 'books'}
            >
              Add Book
            </Button>
          </Box>

          <Paper sx={{ mb: 2 }}>
            <Box display="flex">
              <Button
                onClick={() => setActiveTab('books')}
                variant={activeTab === 'books' ? 'contained' : 'text'}
                sx={{ borderRadius: 0 }}
              >
                Books ({books.length})
              </Button>
              <Button
                onClick={() => setActiveTab('issues')}
                variant={activeTab === 'issues' ? 'contained' : 'text'}
                sx={{ borderRadius: 0 }}
              >
                Issues ({bookIssues.filter(issue => !issue.return_date).length})
              </Button>
            </Box>
          </Paper>

          {activeTab === 'books' && (
            <Paper sx={{ height: 400 }}>
              <DataGrid rows={books} columns={bookColumns} pageSizeOptions={[5, 10, 20]} />
            </Paper>
          )}

          {activeTab === 'issues' && (
            <Paper sx={{ height: 400 }}>
              <DataGrid rows={bookIssues} columns={issueColumns} pageSizeOptions={[5, 10, 20]} />
            </Paper>
          )}

          <BookDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            book={editingBook}
            onSuccess={fetchData}
          />
        </Box>
      </Layout>
    </AuthGuard>
  );
}

interface BookDialogProps {
  open: boolean;
  onClose: () => void;
  book: Book | null;
  onSuccess: () => void;
}

function BookDialog({ open, onClose, book, onSuccess }: BookDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    isbn: '',
    category: '',
    total_copies: 0,
    published_year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name,
        author: book.author,
        isbn: book.isbn || '',
        category: book.category || '',
        total_copies: book.total_copies,
        published_year: book.published_year || new Date().getFullYear(),
      });
    } else {
      setFormData({
        name: '',
        author: '',
        isbn: '',
        category: '',
        total_copies: 0,
        published_year: new Date().getFullYear(),
      });
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (book) {
        await libraryService.updateBook(book.slug, formData);
      } else {
        await libraryService.createBook(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Book Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Author"
            fullWidth
            required
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <TextField
            margin="dense"
            label="ISBN"
            fullWidth
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Total Copies"
            type="number"
            fullWidth
            required
            value={formData.total_copies}
            onChange={(e) => setFormData({ ...formData, total_copies: parseInt(e.target.value) || 0 })}
          />
          <TextField
            margin="dense"
            label="Published Year"
            type="number"
            fullWidth
            value={formData.published_year}
            onChange={(e) => setFormData({ ...formData, published_year: parseInt(e.target.value) || new Date().getFullYear() })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {book ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
