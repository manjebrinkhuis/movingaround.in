import React, { Component } from "react";
import { connect } from "react-redux";

import { setCommentsHeader } from "../../redux/actions";

class CommentsHeader extends Component {
    componentDidMount() {
        this.props.setCommentsHeader();
    }

    render() {
        const { commentsHeader } = this.props.blog;
        return (
            commentsHeader.map((page, index) => {
                return (
                    <div id="comments-header-container"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: page.content.rendered }}>
                    </div>
                )
            })
        )
    }
}

function mapStateToProps(state) {
    return {
        blog: state.blog,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCommentsHeader: () => dispatch(setCommentsHeader()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsHeader)