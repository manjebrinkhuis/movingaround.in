import React, { Component } from "react";
import { connect } from "react-redux";

import Category from "./Category";
import { setCategories } from "../../redux/actions";

class Categories extends Component {

    componentDidMount() {
        this.props.setCategories()
    }

    render() {
        return (
            <div id="categories-container">
                {this.props.blog.categories.map(( cat, index ) => {
                    if (cat.id !== 1) {
                        return (
                            <Category {...cat} key={index} />
                        )
                    }
                    return null
                })}
            </div>  
        )
    }
}

function mapStateToProps( state ) {
    return {
        filters: state.filters,
        blog: state.blog
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setCategories: () => dispatch( setCategories() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
