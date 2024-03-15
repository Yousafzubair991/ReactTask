import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { addJwtToken } from 'src/store/jwt.slice';
import { UserLogin, UserRegister } from 'src/api/user.post';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// import { useHistory } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  // const history = useHistory();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setmode] = useState('login');
  console.log('LoginView', mode);

  const toggleMode = () => {
    if (mode === 'login') setmode('register');
    else setmode('login');
  };

  const handleLogin = async () => {
    if (email === '' || password === '') {
      toast.error('Email and password are required.');
      return;
    }
    try {
      setloading(true);
      const response = await UserLogin({ email, password });
      if (response?.status === 200) {
        toast.success(`Welcome ${response.data.name}!`);
        localStorage.setItem('token', response.data.token);
        dispatch(addJwtToken({ token: response.data.token }));
        router.push('/dashboard');
      } else {
        toast.error('Only admins can login to the system.');
      }
    } catch (error) {
      toast.error('Invalid email or password');
      return;
    } finally {
      setloading(false);
    }
  };

  const resetFeilds = () => {
    setemail('');
    setpassword('');
    setname('');
    setphone('');
  };

  const handleRegister = async () => {
    if (email === '' || password === '' || name === '' || phone === '') {
      toast.error('All fields are required.');
      return;
    }
    try {
      setloading(true);
      const response = await UserRegister({ email, password, name, phone });
      if (response?.status === 201) {
        toast.success(`Registration Successful!`, 'Please login to continue.');
        setmode('login');
        resetFeilds();
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to register');
      return;
    } finally {
      setloading(false);
    }
  };

  const renderLoginForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );

  const renderRegisterForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="name"
          label="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <TextField
          name="phone"
          label="Phone"
          value={phone}
          type="number"
          onChange={(e) => setphone(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover" />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleRegister}
        loading={loading}
      >
        Register
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">{mode === 'login' ? 'Sign in' : 'Sign up'}</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            {mode === 'login' ? 'New user?' : 'Already have an account?'}
            <Link onClick={toggleMode} variant="subtitle2" sx={{ ml: 0.5 }}>
              {mode === 'login' ? 'Create account' : 'Login'}
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {mode === 'login' ? renderLoginForm : renderRegisterForm}
        </Card>
      </Stack>
    </Box>
  );
}
