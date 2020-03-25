import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LanguagesAppBar from '../LanguagesAppBar';
import ReactivePanels from '../ReactivePanels';

import { searchReducer, DEFAULT_STATE } from '../../../state_management/search';


const middleware = [thunk];


const store = createStore(
  searchReducer,
  DEFAULT_STATE,
  applyMiddleware(...middleware));


const getTotalWidth = () => window.innerWidth !== null
  ? window.innerWidth
  : window.document.documentElement.clientWidth;


function SearchPrototypeD(props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main>
      <Provider store={store}>
        <Grid container>
          <Grid item xs={12}>
            <LanguagesAppBar
              handlePanelOpen={() => setIsOpen(!isOpen)}
              open={isOpen}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactivePanels
              leftMinWidth={25}
              open={isOpen}
              rightMinWidth={35}
              />
            </Grid>
        </Grid>
      </Provider>
    </main>
  );
}


export default SearchPrototypeD;