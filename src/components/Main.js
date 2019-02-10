import React, { Component } from 'react';
import { connect } from "react-redux";
import Post from "./Body/Post";
import Tiles from "./Body/Tiles";
import Trace from "./Filters/Trace";
import Filters from "./Filters/Filters";

import { setPosts, appendPosts } from "../redux/actions";
import { Route, withRouter } from "react-router-dom";

import '../styles/Main.css';

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => React.createElement(component, { ...props, ...rest })}
        />
    )
}


class Main extends Component {

    componentDidMount() {
        this.props.setPosts( 1, this.props.blog.perPage );
    }

    createPost() {
        return (
            <Route 
                path="/:category/:slug"
                component={Post} 
            />
        )
    }

    createTiles() {
        return (
            <PropsRoute
                exact path="/"
                component={Tiles}
                posts={this.props.blog.posts}
            />
        )
    }

    render() {
        return (
            <div>
                <div id="navigation-container">
                    <Trace />
                    <Filters />
                </div>
                {this.createTiles()}
                {this.createPost()}
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        blog: state.blog,
        filters: state.filters,
        trace: state.trace
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setPosts: ( page, perPage ) => dispatch( setPosts( page, perPage )),
        appendPosts: ( page, perPage, postIDs ) => dispatch( appendPosts( page, perPage, postIDs ) ),
    }
}

export default withRouter(
    connect(
        mapStateToProps, 
        mapDispatchToProps
    )(Main)
);