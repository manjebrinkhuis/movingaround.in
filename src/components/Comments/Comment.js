import React, { Component } from "react";
import CommentForm from "./CommentForm";
import CommentReplies from "./CommentReplies";
import { formatDate } from "../../utils/helpers";

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            reply: false
        }
    }

    handleClick() {
        this.setState({
            reply: !this.state.reply
        })
    }

    render() {
        const { comment } = this.props;
        const d = new Date(comment.date);
    
        const odd = this.props.odd ? " odd" : " even";

        return (
            <div className={"comment-container" + odd}>
                <span>
                    <b>{comment.author_name}</b>, {formatDate(d)}
                </span>
                <div className={"comment-content" + odd}
                    dangerouslySetInnerHTML = {{ __html: comment.content.rendered }}>
                </div >
                <span>
                    <button className="reply-button" onClick={this.handleClick.bind(this)}>{this.state.reply ? "Cancel" : "Reply"}</button>
                </span>
                <CommentReplies parent={comment.id} reply={this.state.reply} toggleReply={this.handleClick.bind(this)} />
                {this.state.reply ? <CommentForm className="comment-form" parent={comment.id} submit={this.handleClick.bind(this)} /> : null}
            </div>
        )
    }
}

export default Comment