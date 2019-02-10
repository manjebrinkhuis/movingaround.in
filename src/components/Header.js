import React, { Component } from "react";
import { connect } from "react-redux";

import { setHeader } from "../redux/actions";
import "../styles/Header.css";

class Header extends Component {
    componentDidMount() {
        this.props.setHeader();
    }

    render() {
        const { header } = this.props.blog;
        return (
            header.map(( page, index ) => {
                return (
                    <div id="header-container"
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
        setHeader: () => dispatch(setHeader()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)