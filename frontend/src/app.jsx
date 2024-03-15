/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useDispatch, useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useEffect } from 'react';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { addJwtToken } from './store/jwt.slice';
import LoginPage from './pages/login';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.jwt.token);

  useEffect(() => {
    retrieveData();
  });

  const retrieveData = async () => {
    try {
      const userToken = await localStorage.getItem('token');
      if (userToken !== null) {
        dispatch(addJwtToken({ token: userToken }));
      } else {
        console.log('No token found');
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage', e);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider>{token ? <Router /> : <LoginPage />}</ThemeProvider>
    </DndProvider>
  );
}
