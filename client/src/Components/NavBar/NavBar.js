import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { OppdragListe } from '../OppdragListe/OppdragListe.js';

import { oppdragService } from '../../Services/oppdragService.js'
import { brukerService } from '../../Services/brukerService.js'
import { Card } from '../../widgets.js';


export default class NavBar extends Component {

	state = {
		logged: false,
		admin: false
	}

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
    				{this.state.admin && <a className="nav-item nav-link active" href="/administrer"><button className="btn btn-primary"><i className="glyphicon glyphicon-wrench"></i> Administrer Brukere<span className="sr-only">(current)</span></button></a>}
    				{this.state.admin && <a className="nav-item nav-link active" href="/registrer"><button className="btn btn-primary"><i className="glyphicon glyphicon-user"></i> Ny Bruker<span className="sr-only">(current)</span></button></a>}
    				{this.state.logged && <a className="nav-item nav-link active" href="/profil"><button className="btn btn-primary"><i className="glyphicon glyphicon-user"></i> Profil<span className="sr-only">(current)</span></button></a>}
    				{this.state.logged && <a className="nav-item nav-link active" href="/"><button className="btn btn-danger" onClick={e => this.loggut()}><i className="glyphicon glyphicon-remove"></i> Logg Ut<span className="sr-only">(current)</span></button></a>}
    			</div>
  			</div>
			</nav>
		)
	}

	loggut() {
		localStorage.clear();
		brukerService.logout()
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	mounted() {
		brukerService.getInfo()
			.then(res => this.setState({logged: res.logged, admin: res.admin}))
			.catch(err => console.log(err))
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.logged != this.props.logged)
			this.setState({logged: this.props.logged})
	}
}
