import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {
  Avatar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  OutlinedInput,
  DialogContentText,
} from '@mui/material';

import { users } from 'src/_mock/user';
import { UpdateProduct } from 'src/api/user.put';
import { DeleteProduct } from 'src/api/user.delete';
import { FetchAllProducts } from 'src/api/user.get';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import ProductTableRow from '../product-table-row';
import TableNoData from '../../user/table-no-data';
import UserTableHead from '../../user/user-table-head';
import TableEmptyRows from '../../user/table-empty-rows';
import ProductTableToolbar from '../product-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../user/utils';

// ----------------------------------------------------------------------

export default function AllProductsPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [recordId, setrecordId] = useState('');
  const [record, setrecord] = useState('');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setproducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, seteditOpen] = useState(false);

  const handleDeleteOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const handleEditOpen = () => {
    seteditOpen(true);
  };

  const handleEditClose = () => {
    seteditOpen(false);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: products,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const FetchProducts = async () => {
    try {
      const res = await FetchAllProducts();
      if (res.status === 200) {
        console.log(res.data);
        setproducts(res.data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchProducts();
    return () => {};
  }, []);

  const handleDeleteRecord = async () => {
    handleDeleteClose();
    console.log('delete record');
    try {
      const resp = await DeleteProduct(recordId);
      if (resp.status === 200) {
        toast.success('Product Deleted Successfully');
        FetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRecord = async () => {
    handleEditClose();
    try {
      const resp = await UpdateProduct(record?._id, record);
      if (resp.status === 200) {
        toast.success('Product Updated Successfully');
        FetchProducts();
        handleEditClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">All Products</Typography>

        <a href="/addproduct">
          <Button
            href="/addproduct"
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </a>
      </Stack>

      <Card>
        <ProductTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'price', label: 'Price' },
                  { id: 'description', label: 'Description' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ProductTableRow
                      key={row.id}
                      name={row.name}
                      description={row.description}
                      price={`$${row.price}`}
                      avatarUrl={row.image}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => {
                        handleClick(event, row.name);
                      }}
                      handleDeleteClick={() => {
                        handleDeleteOpen();
                        setrecordId(row._id);
                      }}
                      handleUpdateRecord={() => {
                        handleEditOpen();
                        setrecord(row);
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog
          open={open}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Record?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this record? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Cancel</Button>
            <Button onClick={handleDeleteRecord} autoFocus type="reset">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Record</DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              alt={record?.name}
              sx={{ width: 100, height: 100, alignSelf: 'center' }}
              src={record?.image}
            />
            <OutlinedInput
              placeholder="Product Name"
              sx={{ width: '90%', m: 3 }}
              value={record?.name}
              onChange={(e) => {
                setrecord({ ...record, name: e.target.value });
              }}
            />
            <OutlinedInput
              placeholder="Product Price"
              sx={{ width: '90%', m: 3 }}
              value={record?.price}
              type="number"
              onChange={(e) => {
                setrecord({ ...record, price: e.target.value });
              }}
            />
            <OutlinedInput
              placeholder="Product Description"
              sx={{ width: '90%', m: 3, h: 100 }}
              value={record?.description}
              multiline
              rows={4}
              onChange={(e) => {
                setrecord({ ...record, description: e.target.value });
              }}
            />
            <OutlinedInput
              placeholder="Image"
              type="file"
              sx={{ width: '90%', m: 3 }}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setrecord({ ...record, image: selectedFile });
              }}
              inputProps={{ accept: 'image/*' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleUpdateRecord} autoFocus type="reset">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  );
}
