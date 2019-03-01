import React, {Component} from "react";
import { connect } from "react-redux";
import { setComments } from "../../redux/actions";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import CommentsHeader from "./CommentsHeader";

import "../../styles/Comments.css";


class Comments extends Component {
    componentDidMount() {
        this.loadComments()
    }

    handleClick() {
        this.loadComments()
    }

    loadComments() {
        const { comments, post, commentsPerPage } = this.props.blog;
        const filtered = comments.filter( comment => (comment.post === post.id)  && (comment.parent === 0))
        const commentsPage = Math.ceil(filtered.length / commentsPerPage) + 1;
        console.log( commentsPage, commentsPerPage, post.id );
        this.props.setComments(commentsPage, commentsPerPage, post.id)
    }

    render() {
        const { comments, post } = this.props.blog;
        const filtered = comments.filter( comment => comment.post === post.id )
        return (
            <div id="comments-container">
                <CommentsHeader />
                {filtered.filter(comment=>comment.parent===0).map(( comment, index ) => {
                    return <Comment key={index} comment={comment} odd={(index % 2) === 1} />
                })}
                <button id="comments-load-more" onClick={this.handleClick.bind(this)}>{filtered.length ? "Load more" : "Show comments"}</button>
                <CommentForm id="main-comment-form" />
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        blog: state.blog
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setComments: (post, page, perPage) => dispatch(setComments( post, page, perPage ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)