import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  TablePagination,
  Typography
} from "@mui/material";

export type Blog = {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
  status: string;
};

type BlogListProps = {
  blogs: Blog[];
  editBlog: (blog: Blog) => void;
  deleteBlog: (id: number) => void;
};

export default function BlogList({ blogs, editBlog, deleteBlog }: BlogListProps) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Blog | null>(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 4;

  useEffect(() => {
    if (page > 0 && page * rowsPerPage >= blogs.length) {
      setPage(0); // reset to first page if list becomes smaller
    }
  }, [blogs.length, page]);

  const handleOpenDialog = (blog: Blog) => {
    setEditId(blog.id);
    setEditedData({ ...blog });
  };

  const handleCloseDialog = () => {
    setEditId(null);
    setEditedData(null);
  };

  const handleUpdate = () => {
    if (editedData) {
      editBlog(editedData);
      handleCloseDialog();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedData) return;

    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  //for pagination
  const handleChangePage = (e : React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const paginatedBlogs = blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: '1em auto', maxWidth: '90%', maxHeight : '70%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Author</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBlogs.length === 0 && <span style={{display : 'flex', textAlign : 'center', fontWeight : 'bold'}}>No data found</span>}
            {paginatedBlogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.date}</TableCell>
                <TableCell>{blog.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleOpenDialog(blog)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this blog?")) {
                        deleteBlog(blog.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="flex-end" alignItems="center" p={2}>
          <Typography variant="body2" mr={2}>
            Showing {Math.min(page * rowsPerPage + 1, blogs.length)}–
            {Math.min((page + 1) * rowsPerPage, blogs.length)} of {blogs.length}
          </Typography>

          <TablePagination
            component="div"
            count={blogs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
          />
        </Box>

      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editId !== null} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{}}>Edit Blog</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Title and Author side by side */}
          <Box display="flex" gap={2} pt={1}>
            <TextField
              name="title"
              label="Title"
              value={editedData?.title || ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="author"
              label="Author"
              value={editedData?.author || ''}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          {/* Content full width */}
          <TextField
            name="content"
            label="Content"
            value={editedData?.content || ''}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />

          {/* Date and Status side by side */}
          <Box display="flex" gap={2}>
            <TextField
              name="date"
              label="Date"
              value={editedData?.date || ''}
              onChange={handleChange}
              fullWidth
              disabled
            />
            <TextField
              name="status"
              label="Status"
              select
              value={editedData?.status || ''}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
