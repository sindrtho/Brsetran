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

// Returns a string of the Date from date object.
Date.prototype.getFullDate = function() {
	return this.getFullYear()+'-'+(this.getMonth()+1)+'-'+this.getDate();
}

Date.prototype.getWholeMonth = function() {
	var tmp = new Date(this.getTime());
	var currentMonth = tmp.getMonth();
	var month = [];

	tmp.setDate(1);
	//var today = (tmp.getDay()+7)%8;
	var today = (tmp.getDay()+6)%7;

	tmp.setDate(tmp.getDate()-today);

	for(var i = 0; i < 7; i++) {
		month.push(new Date(tmp.getTime()));
		tmp.setDate(tmp.getDate()+1);
	}

	while(tmp.getMonth() == currentMonth) {
		month.push(new Date(tmp.getTime()));
		tmp.setDate(tmp.getDate()+1)
	}

	if(tmp.getDay() != 1) {
		while(tmp.getDay() != 1) {
			month.push(new Date(tmp.getTime()));
			tmp.setDate(tmp.getDate()+1);
		}
	}

	return month;
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

var weekdays = [
	"Mandag",
	"Tirsdag",
	"Onsdag",
	"Torsdag",
	"Fredag",
	"Lørdag",
	"Søndag"
];

var months = [
	"Januar",
	"Februar",
	"Mars",
	"April",
	"Mai",
	"Juni",
	"Juli",
	"August",
	"September",
	"Oktober",
	"November",
	"Desember"
];

export default class Kalender extends Component {
	state = {
		month: new Date().getWholeMonth(),
		currentDate: new Date(),
		routes: [],
		filters: []
	}

	render () {
		return (
			<div>
				<div className="">
					<button className="btn btn-primary" onClick={() => {this.prevMonth()}}>Previous month</button>
					<button className="btn btn-primary" onClick={() => {this.nextMonth()}}>Next month</button>
				</div>
				<div>
					<div>
						<label htmlFor="fullfort">Fullført</label>
						<input type="checkbox" name="fullfort" id="0fullfort" value={0} onChange={() => { this.check_change() }}/>
					</div>
					{
						this.state.routes.map((e, i) => {
							return (
								<div key={i}>
								<label htmlFor={e.rute_navn}>{e.rute_id} {e.rute_navn}</label>
								<input type="checkbox" name={e.rute_navn} id={e.rute_id+e.rute_navn} value={e.rute_id} onChange={() => { this.check_change() }}/>
								</div>
							)
						})
					}
				</div>
				<div className="grid-item"><h2>{months[this.state.currentDate.getMonth()]} {this.state.currentDate.getFullYear()}</h2></div>
				<div className="grid-container">
					{
						weekdays.map((e, i) => {
							return (
								<div className="grid-item" key={i}>{e}</div>
							)
						})
					}
					{
						this.state.month.map((e, i) => {
							if(e.getMonth() == this.state.currentDate.getMonth()) {
								return (
									<div className="grid-item" key={i}>
										{e.getDate()}
										<div className="grid-item callendar-day">
											<OppdragListe date={e} filters={this.state.filters}/>
										</div>
									</div>
								)
							} else {
								return (
									<div key={i} style={{"border": "solid 1px", "backgroundColor": "gray"}} onClick={() => {e.getMonth() > this.state.currentDate.getMonth() ? this.nextMonth() : this.prevMonth()}}></div>
								)
							}
						})
					}
				</div>
			</div>
		)
	}

	mounted () {
		var filters = [false];
		var filter = oppdragService.getRoutes()
			.then(e => this.setState({routes: e, filters: filters}))
			.catch(err => console.log(err))
	}

	check_change() {
		var routes = this.state.routes;
		var fullfort = document.getElementById("0fullfort");
		var filters = [fullfort.checked];
		routes.map(e => {
			var tmp = document.getElementById(e.rute_id+e.rute_navn);
			if(tmp.checked) {
				filters.push(e.rute_id);
			}
		});
		this.setState({filters: filters});
	}

	nextMonth() {
		var tmp = this.state.currentDate;
		var nextmonth = new Date(tmp.getFullYear(), tmp.getMonth()+1, 1);
		var wholeMonth = nextmonth.getWholeMonth();
		this.setState({month: wholeMonth, currentDate: nextmonth});
	}

	prevMonth() {
		var tmp = this.state.currentDate;
		var prevmonth = new Date(tmp.getFullYear(), tmp.getMonth()-1, 1);
		var wholeMonth = prevmonth.getWholeMonth();
		this.setState({month: wholeMonth, currentDate: prevmonth});
	}

	componentDidUpdate(prevProps, prevState) {

	}

}

class KalenderDay extends Component {
	state = {
		cases: []
	}

	render () {
		return (
			<div>
				{
					this.state.cases.map((e, i) => {
						return (
							<KalenderItem key={i} missionId={e.oppdrag_id} color={colorTable[e.rute_id]} title={e.tittel} nr={e.rute_id}/>
						)
					})
				}
			</div>
		)
	}

	mounted() {
		var date = this.props.date;
		oppdragService.getByDate(date.getFullDate())
			.then(e => this.setState({cases: e}))
			.catch(err => console.log(err))
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.date != this.props.date) {
			var date = this.props.date;
			oppdragService.getByDate(date.getFullDate())
				.then(e => this.setState({cases: e}))
				.catch(err => console.log(err))
		}
	}
}

class KalenderItem extends Component {
	render() {
		return (
			<a href={"/oppdrag/"+this.props.missionId}>
				<div style={{"backgroundColor": this.props.color, "border": "solid 1px"}}>
					{this.props.title} rute:{this.props.nr}
				</div>
			</a>
		)
	}

	componentDidUpdate() {

	}
}