'use client';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  MenuItem,
  Button,
  TextField,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';

interface Ticket {
  id: string;
  type: string;
  assigneeId: string;
  status: string;
  companyId: string;
  category: string;
}

export default function Home() {
  const [data, setData] = useState<Ticket[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/v1/tickets');
      const data = await response.json();
      setData(data);
    })();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3, maxWidth: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tickets
        </Typography>

        <Grid container spacing={2}>
          <Grid>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="tickets table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Ticket Type</TableCell>
                      <TableCell>Assignee ID</TableCell>
                      <TableCell>Company ID</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((ticket) => (
                        <TableRow hover key={ticket.id}>
                          <TableCell component="th" scope="row">
                            {ticket.id}
                          </TableCell>
                          <TableCell>{ticket.type}</TableCell>
                          <TableCell>{ticket.assigneeId}</TableCell>
                          <TableCell>{ticket.companyId}</TableCell>
                          <TableCell>{ticket.category}</TableCell>
                          <TableCell>{ticket.status}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
          <Grid>
            <Form />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export function Form() {
  const [formData, setFormData] = useState({
    type: '',
    assigneeId: '',
    category: '',
    companyId: '',
    status: '',
  });

  const handleChange = (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch('/api/v1/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 300,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h6">Create Ticket</Typography>

      <TextField
        select
        label="Ticket Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      >
        <MenuItem value="managementReport">Management Report</MenuItem>
        <MenuItem value="registrationAddressChange">
          Registration Address Change
        </MenuItem>
      </TextField>

      <TextField
        label="Assignee ID"
        name="assigneeId"
        value={formData.assigneeId}
        onChange={handleChange}
        required
      />

      <TextField
        label="Company ID"
        name="companyId"
        value={formData.companyId}
        onChange={handleChange}
        required
      />

      <TextField
        select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <MenuItem value="accounting">accounting</MenuItem>
        <MenuItem value="registrationAddressChange">
          registrationAddressChange
        </MenuItem>
        <MenuItem value="management">management</MenuItem>
      </TextField>

      <TextField
        select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <MenuItem value="open">open</MenuItem>
        <MenuItem value="resolved">resolved</MenuItem>
      </TextField>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}
