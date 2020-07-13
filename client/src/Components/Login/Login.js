import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { brukerService } from '../../Services/brukerService.js'
import { Card } from '../../widgets.js';

import * as bc from 'bcryptjs';

const saltRounds = 10;

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.username = '';
		this.password = '';
		this.loginFail = false;
	}

	render () {
		return (
			<div className="container">
				
			</div>
		)
	}

	render () {
		return (
			<div className="container">
				<br/>
				<div className="container-fluid center-align" style={{'width': '40%'}}>
					<form onSubmit={this.login}>
						<div className="form-group">
							<label>Brukernavn</label>
							<input type="text" className="form-control" name="email" onChange={e => {this.username = e.target.value; this.loginFail = false;}} required/>
						</div>
						<div className="form-group">
							<label>Passord</label>
							<input type="password" className="form-control" name="password" onChange={e => {this.password = e.target.value; this.loginFail = false}} required/>
						</div>
						<button type="submit" className="btn btn-primary"><i className="fas fa-sign-in-alt"></i>Logg inn</button>
					</form>
				</div>
			</div>
		)
	}

	login() {
		bc.genSalt(saltRounds, (err, salt) => {
			bc.hash(this.password, salt, (err, hash) => {
				a = hash;
			});
		});
	}
}