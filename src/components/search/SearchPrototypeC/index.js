import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


import { withStyles } from '@material-ui/core/styles';

import ResizeableContainers from '../ResizeableContainers';
import ResultsTable from '../ResultsTable';
import SearchParametersForm from '../SearchParametersForm';

import { getAvailableLanguages } from '../../../api/corpus';
import { searchReducer } from '../../../state_management/search';


const styles = theme => ({
  outerContainer: {
    height: '88vh',
  },
  root: {
    display: 'flex'
  },
  tabs: {
    width: '100%'
  }
});


const store = createStore(searchReducer);


const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function PanelOpenIcon(props) {
  const { onClick, open } = props;
  return (
    <IconButton
      aria-label={open ? "open panel" : "close panel"}
      onClick={onClick}
    >
      {open ? <ArrowBackIcon /> : <ArrowForwardIcon />}
    </IconButton>
  );
}


class SearchPrototypeC extends React.Component {
  constructor(props) {
    super(props);
    const languages = getAvailableLanguages().sort();
    this.state = {
      currentTab: languages.indexOf('latin'),
      language: languages[languages.indexOf('latin')],
      languages: languages,
      panelOpen: true
    };
  }

  handleChangeTab = (tabIdx) => {
    const newTab = tabIdx;
    const newLang = this.state.languages[newTab];
    this.setState({ language: newLang, currentTab: newTab });
  }

  handleTogglePanel = () => {
    this.setState({ panelOpen: !this.state.panelOpen });
  }

  render() {
    const { classes } = this.props;
    const { currentTab, language, languages, panelOpen } = this.state;

    const tabs = languages.map((item, idx) => {
      return (
        <Tab
          key={item}
          label={item}
          value={idx}
          onClick={() => this.handleChangeTab(idx)}
          { ...a11yProps(idx) }
        />
      )
    });

    return (
      <main className={classes.root}>
        {/* <Provider store={store}>
          <Grid container>
            <Grid item xs={12}>
          <AppBar position="static">
          <Tabs
          className={classes.tabs}
          value={currentTab}
          >
          {tabs}
          </Tabs>
          </AppBar>
            </Grid>
            <Grid item>
          <SearchParametersForm />
            </Grid>
            <Grid item>
          <ResultsTable />
            </Grid>
          </Grid>
        </Provider> */}
        <Provider store={store}>
          <Grid container>
            <Grid item xs={12}>
              <AppBar position="static">
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <PanelOpenIcon
                      onClick={this.handleTogglePanel}
                      open={panelOpen}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Tabs
                      className={classes.tabs}
                      value={currentTab}
                    >
                      {tabs}
                    </Tabs>
                  </Grid>
                </Grid>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              <ResizeableContainers
                leftMinWidth={panelOpen ? 25 : 0}
                rightMinWidth={40}
              />
            </Grid>
        </Grid>
      </Provider>
      </main>
    );
  }
}


export default withStyles(styles)(SearchPrototypeC);
