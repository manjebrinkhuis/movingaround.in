import React, { Component } from "react";
import Categories from "./Categories";
import Timeline from "./Timeline";
import { setPosts } from "../../redux/actions";
import { connect } from "react-redux"; 

import "../../styles/Filter.css";
import { filterPosts } from "../../utils/helpers";
import { withRouter } from "react-router";

class Filters extends Component {

    applyFilter( postIDs ) {        
        const { perPage } = this.props.blog;
        this.props.setPosts(1, perPage, postIDs);
        this.props.history.push("/");
    }

    showButton() {
        const { trace } = this.props.trace;
        const { categories, dateFrom, dateTo } = this.props.filters;
        const postIDs = filterPosts( trace, categories, [dateFrom, dateTo]).map( point => point.id ); 
        
        if ( postIDs.length ) {
            return (
                <button 
                    onClick={() => this.applyFilter( postIDs )}>
                    {true ? "Apply filters" : "Loading..." }
                </button>
            )
        } else {
            return <button disabled={true}>No results</button>
        }
    }

    render() {
        return(
            <div id="filters-container">
                <Categories />
                <Timeline />
                <div className="filters-apply">
                    {this.showButton()}
                </div>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        filters: state.filters,
        trace: state.trace,
        blog: state.blog
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setPosts: ( page, perPage, postIDs ) => dispatch( setPosts( page, perPage, postIDs ) ),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filters))