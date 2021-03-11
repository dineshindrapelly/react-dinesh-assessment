import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainHeader from './components/MainHeader';
import MainLayout from './components/MainLayout';

const store = createStore();


const MainApp = () => (
  <div>
    <CssBaseline />
    <Provider store={store}>
      <MainLayout>
        <MainHeader />
      </MainLayout>
    </Provider>
  </div>
);

export default MainApp;
