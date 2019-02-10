import React, { Component } from "react";
import { connect } from "react-redux";

import { setFooter } from "../redux/actions";
import "../styles/Footer.css";

class Footer extends Component {
    componentDidMount() {
        this.props.setFooter();
    }

    render() {
        const { footer } = this.props.blog;
        return (
            footer.map(( ftr, index ) => {
                return (
                    <div 
                        className="footer-container" 
                        key={index}
                        dangerouslySetInnerHTML={{__html: ftr.content.rendered}}>
                    </div>
                )
            })
        )
    }
}

function mapStateToProps( state ) {
    return {
        blog: state.blog,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setFooter: () => dispatch( setFooter( )),
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(Footer)