import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Comments from "../Comments/Comments";
import { getAndSetPost, clearPost } from "../../redux/actions";


class Post extends Component {

    componentDidMount() {
        const { slug } = this.props.match.params;
        const { post, posts } = this.props.blog;
        if (!post || ( post && ( slug !== post.slug ))) {
            this.props.getAndSetPost({ slug }, posts)
        }
    }
    
    showTiles() {
        // Switch to tiles
        this.props.clearPost();
        this.props.history.push("/")
    }

    render() {
        const { post } = this.props.blog;

        if ( post ) {
            return (
                <div id="posts-container-outer">
                    <div className="post-container">
                        <div className="post-left-block">
                            <h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}></h1>
                            <h2>{post.acf.date}</h2>
                            <button onClick={this.showTiles.bind(this)}>Back</button>
                        </div>
                        <div className="post-right-block" dangerouslySetInnerHTML={{__html: post.content.rendered}} />
                    </div>
                    {post.comment_status === "open" ? <Comments /> : "Comments are closed"}
                </div>
            )
        }
        return null
    }
}


function mapStateToProps( state ) { 
    return {
        blog: state.blog
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        getAndSetPost: ( post, posts ) => dispatch( getAndSetPost( post, posts )),
        clearPost: () => dispatch(clearPost())

    }
}


export default withRouter(
    connect( mapStateToProps, mapDispatchToProps )(Post)
)
