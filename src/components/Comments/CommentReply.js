import React, { Component } from "react";
import { formatDate } from "../../utils/helpers";


class Reply extends Component {

    render() {
        const { comment } = this.props;
        const d = new Date(comment.date);

        const odd = this.props.odd ? " odd" : " even";

        return (
            <div className={"comment-container reply" + odd}>
                <span>
                    <b>{comment.author_name}</b>, {formatDate(d)}
                </span>
                <div className={"comment-content" + odd }
                    dangerouslySetInnerHTML={{ __html: comment.content.rendered }}>
                </div >
                <span>
                    <button className="reply-reply-button" onClick={this.props.toggleReply}>{this.props.reply ? "Cancel" : "Reply"}</button>
                </span>
            </div>
        )
    }
}

export default Reply