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

// Returns a list of all dates in a week from single Date object.
Date.prototype.getFullWeek = function() {
	let today = (this.getDay()+7)%8;
	let date = new Date(this.getTime());
	date.setDate(date.getDate()-today);

	let week = [];
	for(var i = 0; i < 7; i++) {
		week.push(new Date(date.getTime()));
		date.setDate(date.getDate()+1);
	}

	return week;
}

Date.prototype.getWeek = function(){
    // We have to compare against the first monday of the year not the 01/01
    // 60*60*24*1000 = 86400000
    // 'onejan_next_monday_time' reffers to the miliseconds of the next monday after 01/01

    var day_miliseconds = 86400000,
        onejan = new Date(this.getFullYear(),0,1,0,0,0),
        onejan_day = (onejan.getDay()==0) ? 7 : onejan.getDay(),
        days_for_next_monday = (8-onejan_day),
        onejan_next_monday_time = onejan.getTime() + (days_for_next_monday * day_miliseconds),
        // If one jan is not a monday, get the first monday of the year
        first_monday_year_time = (onejan_day>1) ? onejan_next_monday_time : onejan.getTime(),
        this_date = new Date(this.getFullYear(), this.getMonth(),this.getDate(),0,0,0),// This at 00:00:00
        this_time = this_date.getTime(),
        days_from_first_monday = Math.round(((this_time - first_monday_year_time) / day_miliseconds));

    var first_monday_year = new Date(first_monday_year_time);

    // We add 1 to "days_from_first_monday" because if "days_from_first_monday" is *7,
    // then 7/7 = 1, and as we are 7 days from first monday,
    // we should be in week number 2 instead of week number 1 (7/7=1)
    // We consider week number as 52 when "days_from_first_monday" is lower than 0,
    // that means the actual week started before the first monday so that means we are on the firsts
    // days of the year (ex: we are on Friday 01/01, then "days_from_first_monday"=-3,
    // so friday 01/01 is part of week number 52 from past year)
    // "days_from_first_monday<=364" because (364+1)/7 == 52, if we are on day 365, then (365+1)/7 >= 52 (Math.ceil(366/7)=53) and thats wrong

    return (days_from_first_monday>=0 && days_from_first_monday<364) ? Math.ceil((days_from_first_monday+1)/7) : 52;
}

export class Ukeliste extends Component {
	today = new Date();
	weekdates = [];

	render () {
		return (
			<div className="ukeliste">
			<button>{"<="}</button>
			<p id="ukenummer">Uke {new Date(this.weekdates[0]).getWeek()}</p>
				{
					this.weekdates.map((d, i) => {
						return (
							<div key={i} className='ukedag'>
								<OppdragListe date={d}/>
							</div>
						)
					})
				}
			</div>
		)
	}

	mounted () {
		this.weekdates = this.today.getFullWeek();
	}
}