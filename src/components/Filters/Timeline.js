import React, { Component } from "react";
import { connect } from "react-redux";
import { setDateFrom, setDateTo } from "../../redux/actions";

import { Range } from 'rc-slider';

import "../../styles/Timeline.css";
import 'rc-slider/assets/index.css';

import { formatDate } from "../../utils/helpers";

class TimeLine extends Component {

    handleChange( value ) {
        this.props.setDateFrom( value[0] );
        this.props.setDateTo( value[1] );
    }

    getDateRange( trace ) {
        return {
            minDate: Math.min( ...trace.map( point => Date.parse( point.acf.date ))),
            maxDate: Math.max( ...trace.map( point => Date.parse( point.acf.date )))
        }
    }

    createSlider() {
        const { trace } = this.props.trace;
        const { minDate, maxDate } = this.getDateRange( trace );
        const { dateFrom, dateTo } = this.props.filters;
        const barWidth = 1.5

        const handleStyle = {
            margin: 0, 
            width: barWidth + "em", 
            height: barWidth + "em",
            border: 0,
            background: "#345"
        }
        
        if (trace.length) {

            const d1 = new Date(dateFrom ? dateFrom : minDate);
            const d2 = new Date(dateTo ? dateTo : maxDate);

            return (
                <div id="timeline">
                    <div className="timeline-left"><p>{formatDate(d1)}</p></div>
                    <div className="timeline-right"><p>{formatDate(d2)}</p></div>
                    <Range 
                        min={minDate} 
                        max={maxDate} 
                        defaultValue={[minDate, maxDate]} 
                        onChange={this.handleChange.bind(this)}
                        style={{
                            margin: 0,
                            padding: 0,
                            height: barWidth + "em"
                        }}
                        railStyle={{
                            background:"#abc",
                            height: barWidth + "em",
                            borderRadius: barWidth/2 + "em"
                        }}
                        trackStyle={[{
                            background:"#678",
                            height: barWidth + "em",
                            borderRadius: barWidth/2 + "em"
                        }]}
                        handleStyle={[handleStyle, { ...handleStyle, marginLeft: -barWidth + "em"}]}
                    />
                </div>
            )
        } else {
            return null
        }
        
    }

    render() {
        return (
            <div id="timeline-container">
                {this.createSlider()}
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return {
        filters: state.filters,
        trace: state.trace
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setDateFrom: ( date ) => dispatch( setDateFrom( date )),
        setDateTo: ( date ) => dispatch( setDateTo( date )) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine)
