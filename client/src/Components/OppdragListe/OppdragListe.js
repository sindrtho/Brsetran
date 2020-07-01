import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { oppdragService } from '../../Services/oppdragService.js'
import { Card } from '../../widgets.js';

// Returns a string of the Date from date object.
Date.prototype.getFullDate = function() {
	return this.getFullYear()+'-'+(this.getMonth()+1)+'-'+this.getDate();
}

Date.prototype.getDateForPrint = function() {
	return this.getDate()+'.'+(this.getMonth()+1)+'.'+this.getFullYear();
}

const colorTable = {
	1: "red",
	2: "green",
	3: "yellow",
	4: "pink",
	5: "lightBlue",
	6: "teal",
	7: "darkGreen",
	8: "salmon",
	9: "orange",
	10: "blue"
}

const Weekdays = [
	"Søndag",
	"Mandag",
	"Tirsdag",
	"Onsdag",
	"Torsdag",
	"Fredag",
	"Lørdag"
];

// List of all assignments for the day.
export class OppdragListe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: {},
			dateString: "2",
			oppdrag: [],
			filters: []
		}
	}

	render () {
		return (
			<div className="dagsliste">
			<p>{Weekdays[new Date(this.state.date).getDay()]} {new Date(this.state.date).getDateForPrint()}</p>
				<div className="dagslistecontent">
				{
					this.state.oppdrag.map(e => {
						return (
							<Sammendrag key={e.oppdrag_id} tittel={e.tittel} missionid={e.oppdrag_id} dato={e.dato} utfort={e.utfort} ruteid={e.rute_id} rutenavn={e.rute_navn}/>
						)
					})
				}
				</div>
			</div>
		)
	}

	mounted() {
		var newDate = new Date();
		if(this.props.date)
			newDate = this.props.date;
		var dateString = newDate.getFullDate();
		var f = this.props.filters;

		oppdragService.getByDate(dateString)
			.then(e => {
				var tmp = e;
				if(f[0] == false)
					tmp = tmp.filter(a => a.utfort == 0);
				this.setState({oppdrag: tmp, date: newDate, dateString: dateString, filters: f})
			})
			.catch(err => console.log(err))
	}

	componentDidUpdate(prevProps, prevState) {

		// Updating assingments if the date changes
		if(prevProps.date != this.props.date) {
			var newDate = this.props.date;
			var dateString = newDate.getFullDate();
			var f = this.state.filters;
			
			// Date updates and filter is empty except from done and not done			
			if(f.length == 1) {
				oppdragService.getByDate(dateString)
					.then(e => {
						var tmp = e;
						if(f[0] == false)
							tmp = tmp.filter(a => a.utfort==0);
						this.setState({oppdrag: tmp, date: newDate, dateString: dateString})
					})
					.catch(err => console.log(err))
			} 

			// Filter list is NOT empty
			else {
				oppdragService.getByDate(dateString)
					.then(e => {
						var tmp = e.filter(a => f.includes(a.rute_id));
						if(f[0] == false)
							tmp = tmp.filter(a => a.utfort==0);
						this.setState({oppdrag: tmp, date: newDate, dateString: dateString});
					})
					.catch(err => console.log(err))
			} 
		}

		// Updating filters for assignment visibility
		if(prevProps.filters != this.props.filters) {
			var f = this.props.filters;
			if(f.length > 1) {
				oppdragService.getByDate(this.state.dateString)
					.then(e => {
						var tmp = e.filter(a => f.includes(a.rute_id));
						if(f[0] == false)
							tmp = tmp.filter(a => a.utfort==0);
						this.setState({oppdrag: tmp, filters: f})
					})
					.catch(err => console.log(err))
			} else {
				oppdragService.getByDate(this.state.dateString)
					.then(e => {
						var tmp = e;
						if(f[0] == false)
							tmp = tmp.filter(a => a.utfort==0);
						this.setState({oppdrag: tmp, filters: f})
					})
					.catch(err => console.log(err))
			}
		}
	}
}

// Short summary of task and customer.
export class Sammendrag extends Component {
	render () {
		return (
		<NavLink to={'/oppdrag/'+this.props.missionid}>
			<div className="sammendrag">
				<Card title={this.props.tittel} c={this.props.utfort==1 ? "white" : colorTable[this.props.ruteid]}>
					<div className="content">
						<p className="summaryRoute">Rute {this.props.ruteid}: {this.props.rutenavn}</p>
					</div>
				</Card>
			</div>
		</NavLink>
		)
	}
}