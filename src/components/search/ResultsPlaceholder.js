/**
 * @fileoverview Placeholder over the results table before/during search.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResultsPlaceholder
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@material-ui/core
 * @requires NPM:@material-ui/icons
 * @requires ../../../api/corpus
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getSearchStatusAction, fetchResultsAction } from '../../api/corpus';
import { sleep, toTitleCase } from '../../utils';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: '30%'
  },
  spacer: {
    display: 'block',
    marginTop: '25vh',
    marginLeft: '40%'
  },
  icon: {
    height: '20vh',
    marginLeft: '25px',
    width: '20vh'
  },
  text: {
    display: 'inline-block',
    fontSize: 18,
    marginTop: '20px'
  }
}));


/**
 * Placeholder content before/during a search.
 * @component
 * 
 * @example
 *   
 */
function ResultsPlaceholder(props) {
  const { asyncPending, fetchResults, getSearchStatus, results, searchID,
          searchInProgress, searchStatus, searchStatusProgress } = props;

  /** CSS styles and global theme. */
  const classes = useStyles(props);

  console.log(searchID);
  // Either check for the status or get results from the REST API.
  if (results.length === 0 && searchID !== null) {

    // Ping the REST API for status every few seconds.
    if (searchInProgress && searchStatus.toLowerCase() !== 'done') {
      (async () => {
        await sleep(100).then(() => {
          getSearchStatus(searchID, asyncPending);
        });
      })();
    }
    
    // Retrieve results if the status is "Done"
    if (searchStatus.toLowerCase() === 'done') {
      fetchResults(searchID, asyncPending);
    }
  }

  console.log(searchStatusProgress);
  const progress = searchStatusProgress.map(item => {
    return (
      <Typography>{toTitleCase(item.stage)}: <LinearProgress value={item.value * 100} variant= "determinate" /></Typography>
    );
  })


  // If a search is not in progress, an arrow pointing to the side bar is shown.
  // If a search is in progress, a spinning wheel is shown.
  return (
    <Hidden only={['xs', 'sm']}>
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="row"
      >
        {!searchInProgress
         ?  <Box
              className={classes.spacer}
            >
              <ArrowBackIcon
                className={classes.icon}
                color="primary"
                style={{ fontSize: 9000 }}
                viewBox="4 4 18 18"
              />
              <br />
              <Typography
                className={classes.text}
                color="primary"
                variant="subtitle1">
                Run a search to find parallels.
              </Typography>
            </Box>
         :  <Box
              className={classes.spacer}
            >
              <CircularProgress
                className={classes.icon}
                thickness={2.5}
                size={'20vh'}
              />
              <br />
              <Typography
                align="left"
                className={classes.text}
                color="primary"
                variant="subtitle1"
              >
                Searching. This may take a moment.
              </Typography>
              {progress}
            </Box>
        }
      </Box>
    </Hidden>
  );
}


ResultsPlaceholder.propTypes = {
  /**
   * Flag denoting that an AJAX call is/not in progress.
   */
  asyncPending: PropTypes.bool,

  /**
   * Function to get results from the REST API.
   */
  fetchResults: PropTypes.func,

  /**
   * Function to get the status of the search from the REST API.
   */
  getSearchStatus: PropTypes.func,

  /**
   * List of results returned from the search.
   */
  results: PropTypes.arrayOf(PropTypes.object),

  /**
   * ID assigned to the search by the REST API.
   */
  searchID: PropTypes.string,

  /**
   * Flag showing that a search is in progress. (duh)
   */
  searchInProgress: PropTypes.bool,

  /**
   * Search status string returned from the REST API.
   */
  searchStatus: PropTypes.string,

  /**
   * Progress indicators for stages of a search.
   */
  searchStatusProgress: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Name of the search stage.
     */
    stage: PropTypes.string,

    /**
     * Percent completion.
     */
    value : PropTypes.number
  }))
}


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
const mapStateToProps = state => ({
  asyncPending: state.asyncPending,
  results: state.results,
  searchID: state.searchID,
  searchInProgress: state.searchInProgress,
  searchStatus: state.searchStatus,
  searchStatusProgress: state.searchStatusProgress,
  shouldInitiateSearch: state.shouldInitiateSearch
});


/**
 * Add redux store actions to this component's props.
 * @param {function} dispatch The redux dispatch function.
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchResults: fetchResultsAction,
  getSearchStatus: getSearchStatusAction,
}, dispatch)


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(ResultsPlaceholder);