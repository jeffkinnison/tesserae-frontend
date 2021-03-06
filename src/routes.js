/**
 * @fileoverview Top-level routing information for easy page management.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports App
 * 
 * @requires NPM:react
 * @requires 
 */
import React from 'react'

import About from './components/about';
import CorpusManager from './components/corpus_manager';
import Multitext from './components/multitext';
import ReaderRouter from './components/reader';
import Search from './components/search';


/**
 * Routing data for various pages in the app.
 */
const routes = [
  /**
   * Metadata for a page.
   * 
   * @field {string} link The URL path to the page.
   * @field {string} name The name of the page being linked.
   * @field {React.Component} component The component to render.
   */
  {link: '/about', name: 'About', component: About, display: true},
  {link: '/corpus', name: 'Corpus', component: CorpusManager, display: true},
  {link: "/", name: "Search", component: Search, display: true},
  {link: "/multitext", name: "Multitext", component: Multitext, display: true},
  {link: "/reader", name: "Reader", component: ReaderRouter, display: false},
  {link: "https://tesseraev3.caset.buffalo.edu/", name: "Version 3", component: null, display: true, external: true}
];


export default routes;
