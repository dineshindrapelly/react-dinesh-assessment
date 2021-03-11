import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import MainHeader from './components/MainHeader';
import MainLayout from './components/MainLayout';



const MainApp = () => (
  <div>
    <CssBaseline />
      <MainLayout>
        <MainHeader />
      </MainLayout>
  </div>
);

export default MainApp;
