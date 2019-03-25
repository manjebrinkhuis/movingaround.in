import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Tile from "./Tile";
import { setPosts } from "../../redux/actions";
import { filterPosts } from "../../utils/helpers";

class Tiles extends Component {

    updatePosts( postIDs ) {
        this.props.appendPosts( this.props.blog.page + 1, this.props.blog.perPage, postIDs );
    }

    showLoading() {
        if ( this.props.blog.isFetching ) {
            return (
                <div id="posts-loading">Loading...</div>
            )
        }
    }

    showMore() {
        const postsShown = this.props.blog.page * this.props.blog.perPage;
        const { trace } = this.props.trace;
        const { categories, dateFrom, dateTo } = this.props.filters;

        const postIDs = filterPosts(trace, categories, [dateFrom, dateTo]).map(point => point.id); 

        if ( !this.props.blog.isFetching && ( postIDs.length > postsShown )) {
            return (
                <div id="posts-load-more">
                    <button onClick={() => this.updatePosts( postIDs )}>Show more</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div id="posts-container-outer">
                <div id="posts-container">
                    {this.props.posts.sort((a, b) => {
                        return Date.parse(b.acf.date) - Date.parse(a.acf.date)
                    }).map((post, index) => {
                        return (
                            <Tile
                                key={index}
                                {...post}
                            />
                        )
                    })}
                </div>
                {this.showLoading()}
                {this.showMore()}
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        blog: state.blog,
        trace: state.trace,
        filters: state.filters
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appendPosts: (page, perPage, postIDs) => dispatch(setPosts(page, perPage, postIDs, true)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tiles))