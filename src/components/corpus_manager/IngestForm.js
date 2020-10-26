import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import BlockIcon from '@material-ui/icons/Block';

import FileUpload from '../common/FileUpload';
import { ingestText } from '../../api/corpus';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    '& .MuiTextField-root': {
      backgroundColor: theme.palette.default.main,
      margin: theme.spacing(1),
      width: '75%',
    },
    '& .MuiSelect-root': {
      backgroundColor: theme.palette.default.main,
    },
    '& .MuiOutlinedSelect-root': {
      width: '75%'
    }
  },
  fab: {
    marginTop: theme.spacing(1)
  },
  select: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: '75%'
  },
  upload: {
    width: '75%'
  }
}));


/**
 * Form to select a new text for ingest.
 * 
 * @component
 * @example
 *  return (
 *    <IngestForm
 *      availableLanguages={['Latin', 'Greek']}
 *      ingestText
 *    />
 *  );
 */
function IngestForm(props) {
  const { availableLanguages, ingestText } = props;
  console.log(availableLanguages);

  const classes = useStyles();

  /** Tess filename and updater. */
  const [ file, setFile ] = useState({});

  /** Tess file metadata and updater. */
  const [ metadata, setMetadata ] = useState({
    author: '',
    isProse: false,
    language: '',
    title: '',
    year: 1
  });

  /** Flag indicating that all fields are filled */
  const [ submitReady, setSubmitReady ] = useState(false);

  /**
   * Update the requested metadata field and determine if all are filled.
   * 
   * @param {String} label The metadata field to update.
   * @param {*} value The value to store in that field.
   */
  const updateMetadata = (label, value) => {
    // Since year 0 does not exist, skip it.
    if (label === 'year' && value === '0') {
      value = metadata.year === 1 ? '-1' : '1';
    }

    setMetadata({...metadata, [label]: value});

    const metadataFilled = (
      metadata.author !== '' &&
      metadata.language !== '' &&
      metadata.title === ''
    );

    if (file !== '' && metadataFilled) {
      setSubmitReady(true);
    }
    else {
      setSubmitReady(false);
    }
  };

  /** Icon to display on the submit button. */
  const icon = (submitReady ? <ArrowUpwardIcon /> : <BlockIcon />)

  return (
    <Grid container
      alignItems="center"
      justify="center"
      display="flex"
    >
      <Grid item
        md={8}
        xs={12}
      >
        <Paper
          className={classes.root}
        >
          <Grid container
            alignItems="center"
            direction="column"
            justify="center"
            spacing={0}
          >
            <Toolbar>
              <Typography variant='h5'>
                Ingest a Text
              </Typography>
            </Toolbar>
            <div
              className={classes.upload}
            >
              <FileUpload
                buttonIcon={<AddIcon />}
                buttonText="Upload"
                file={file}
                setFile={setFile}
              />
            </div>
            <Select
              className={classes.select}
              id="ingest-language"
              label="Language"
              onChange={(event) => updateMetadata('language', event.target.value)}
              required
              value={metadata.language}
              variant="outlined"
            >
              {
                availableLanguages.map(item => {
                  return <MenuItem key={item} value={item}>{item}</MenuItem>
                })
              }
            </Select>
            <TextField
              id="ingest-author"
              label="Author"
              onChange={(event) => updateMetadata('author', event.target.value)}
              required
              value={metadata.author}
              variant="outlined"
            />
            <TextField
              id="ingest-title"
              label="Title"
              onChange={(event) => updateMetadata('title', event.target.value)}
              required
              value={metadata.title}
              variant="outlined"
            />
            <TextField
              id="ingest-year"
              label="Year of Publication"
              onChange={(event) => updateMetadata('year', event.target.value)}
              type="number"
              value={metadata.year}
              variant="outlined"
            />
            <Select
              className={classes.select}
              id="ingest-genre"
              label="Genre"
              onChange={(event) => updateMetadata('isProse', event.target.value)}
              value={metadata.isProse}
              variant="outlined"
            >
              <MenuItem value={false}>Poetry</MenuItem>
              <MenuItem value={true}>Prose</MenuItem>
            </Select>
            <Fab
              className={classes.fab}
              disabled={!submitReady}
              onClick={() => ingestText(file, metadata)}
              variant="extended"
            >
              {icon} Submit
            </Fab>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}


IngestForm.propTypes = {
  /**
   * The languages exposed through the REST API.
   */
  availableLanguages: PropTypes.arrayOf(PropTypes.string),

  /**
   * Function to submit the text and metadata to the REST API.
   */
  ingestText: PropTypes.func
};


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
function mapStateToProps(state) {
  return {
    availableLanguages: state.corpus.availableLanguages
  }
}


/**
 * Add redux store actions to this component's props.
 * @param {function} dispatch The redux dispatch function.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ingestText: ingestText
  }, dispatch);
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(IngestForm);