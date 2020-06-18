import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { HASHRouter, Route, NavLink } from 'react-router-dom';

export class Card extends Component {
	render() {
		return (
			<div className="card" style={{'backgroundColor': this.props.c}}>
				<h1 className="headline">{this.props.title}</h1>
				<div>{this.props.children}</div>
			</div>
		)
	}
}