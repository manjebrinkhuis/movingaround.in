import React, { Component } from "react";
import { connect } from "react-redux";

import { setCategory, unsetCategory } from "../../redux/actions";

import "../../styles/Category.css";

class Category extends Component {

    isActive() {
        return this.props.filters.categories.filter( cat => { 
            return cat === this.props.id 
        }).length > 0
    }
    
    toggle() {
        if (this.isActive()) {
            this.props.unsetCategory(this.props.id)
        } else {
            this.props.setCategory(this.props.id)
        }
    }
    
    render() {
        return (
            <button 
                className={this.isActive() ? "active-category-button" : "category-button"}
                onClick={this.toggle.bind(this)}>
                {this.props.name}
            </button>  
        )
    }
}

function mapStateToProps( state ) {
    return {
        filters: state.filters
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setCategory: ( cat ) => dispatch( setCategory( cat )),
        unsetCategory: ( cat ) => dispatch( unsetCategory( cat ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
