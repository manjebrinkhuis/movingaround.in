import React, { Component } from "react";
import { connect } from "react-redux";
import CommentReply from "./CommentReply";

class CommentReplies extends Component {

    render() {
        const { comments, post } = this.props.blog;
        const filtered = comments.filter(comment => comment.post === post.id)
        return (
            filtered.reverse().filter(comment => comment.parent === this.props.parent).map((comment, index) => {
                return (
                    <CommentReply 
                        key={index} 
                        reply={this.props.reply}
                        toggleReply={this.props.toggleReply}
                        comment={comment} 
                        odd={(index % 2) === 1} 
                    />
                )
            })
        )
    }
}

function mapStateToProps(state) {
    return {
        blog: state.blog
    }
}

export default connect(mapStateToProps, null)(CommentReplies)