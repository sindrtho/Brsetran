import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { OppdragListe } from '../OppdragListe/OppdragListe.js';

import { oppdragService } from '../../Services/oppdragService.js'
import { Card } from '../../widgets.js';


export default class NavBar extends Component {
	render () {
		return (
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  			<a class="navbar-brand" href="/">Brødrene Sætran Arbeidskallender</a>
  			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    			<span class="navbar-toggler-icon"></span>
  			</button>
  			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    			<div class="navbar-nav">
      			<a class="nav-item nav-link active" href="/nyttoppdrag">Nytt Oppdrag <span class="sr-only">(current)</span></a>
						<a class="nav-item nav-link active" href="/ukeliste">Ukeliste <span class="sr-only">(current)</span></a>
    			</div>
  			</div>
			</nav>
		)
	}
}
