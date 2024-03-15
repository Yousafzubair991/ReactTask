import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, OutlinedInput } from '@mui/material';

import { AddNewProduct } from 'src/api/user.post';

// ----------------------------------------------------------------------

export default function AddProduct() {
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState('');
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    seterror('');
    if (name === '') {
      seterror('Name is required');
      return;
    }
    if (price === '') {
      seterror('Price is required');
      return;
    }
    if (description === '') {
      seterror('Description is required');
      return;
    }
    if (image === '') {
      seterror('Image is required');
      return;
    }
    setloading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);

      const resp = await AddNewProduct(formData);
      if (resp.status === 201) {
        toast.success('Product Added Successfully');
        navigate('/allproducts');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error Adding Product');
    } finally {
      setloading(false);
    }
  };

  return (
    <Container direction="column">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Add New Product</Typography>
      </Stack>
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <OutlinedInput
          placeholder="Product Name"
          sx={{ width: '50%', m: 3 }}
          value={name}
          onChange={(e) => {
            seterror('');
            setname(e.target.value);
          }}
        />
        <OutlinedInput
          placeholder="Product Price"
          sx={{ width: '50%', m: 3 }}
          value={price}
          type="number"
          onChange={(e) => {
            seterror('');
            setprice(e.target.value);
          }}
        />
        <OutlinedInput
          placeholder="Product Description"
          sx={{ width: '50%', m: 3, h: 100 }}
          value={description}
          multiline
          rows={4}
          onChange={(e) => {
            seterror('');
            setdescription(e.target.value);
          }}
        />
        <OutlinedInput
          placeholder="Image"
          type="file"
          sx={{ width: '50%', m: 3 }}
          onChange={(e) => {
            seterror('');
            const selectedFile = e.target.files[0];
            setimage(selectedFile);
          }}
          inputProps={{ accept: 'image/*' }}
        />
        {error && (
          <Typography sx={{ width: '50%', ml: 3 }} color="error">
            {error}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          sx={{ width: '50%', m: 3, height: 50 }}
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Loading....' : 'Add Product'}
        </Button>
      </Box>
    </Container>
  );
}
