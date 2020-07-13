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
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  			<a className="navbar-brand" href="/">Brødrene Sætran Arbeidskallender</a>
  			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    			<span className="navbar-toggler-icon"></span>
  			</button>
  			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    			<div className="navbar-nav">
      			<a className="nav-item nav-link active" href="/nyttoppdrag">Nytt Oppdrag <span className="sr-only">(current)</span></a>
						<a className="nav-item nav-link active" href="/ukeliste">Ukeliste <span className="sr-only">(current)</span></a>
    			</div>
  			</div>
			</nav>
		)
	}
}
