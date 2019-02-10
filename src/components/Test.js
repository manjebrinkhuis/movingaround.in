import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

const Single = (props) => {
    return (
        <div>
            <span>
                <h1>{props.match.params.cat}</h1>
                <p>{props.match.params.slug}</p>
            </span>
            <button onClick={() => props.history.push("/")}>Multi</button>
        </div>
    )
}

const Multi = (props) => {
    let params = new URLSearchParams(props.location.search);
    return (
        <div>
            <h1>Multi</h1>
            <p>{params.get("countries")}</p>
            <button onClick={() => props.history.push("/single/one")}>Single</button>
            <button onClick={() => props.history.push("/single/two")}>Single</button>
            <button onClick={() => props.history.push("/single/three")}>Single</button>
        </div>
    )
}

class Test extends Component {
    constructor() {
        super();
        this.state = {
            url: "/"
        };
    }

    updateURL() {
        this.props.history.push( this.state.url );
    }

    createSingle() {
        return( 
            <Route path="/:cat/:slug" component={withRouter(Single)} />
        )
    }

    createMulti() {
        return (
            <Route exact path="/" component={withRouter(Multi)} />
        )
    }

    toggle() {
        this.updateURL();
        const url = this.state.url === "/" ? "single" : "/";
        this.setState({ url })
    }

    render() {
        return(
            <div id="test-container">
                {this.createSingle()}
                {this.createMulti()}
            </div>
        )
    }
}

export default withRouter(Test)