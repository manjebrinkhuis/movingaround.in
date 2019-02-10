import React, { Component } from "react";
import { connect } from "react-redux";
import { appendComment } from "../../redux/actions";

class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            message: "",
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const requestInfo = {
            author_name: this.state.name,
            author_email: this.state.email,
            content: this.state.message,
            parent: this.props.parent,
            post: this.props.blog.post.id
        }

        const URL = "https://wp.movingaround.in/wp-json";

        fetch( URL + "/wp/v2/comments", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify( requestInfo )
        }).then( response => {
            if ( response.ok ) {
                response.json().then( comment => {
                    this.props.appendComment( comment )
                })
            }
        }).then(() => {
            this.props.submit && this.props.submit()
        })
    }

    validateInput() {
        return (!this.state.email) || (!this.state.name) || (!this.state.message)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form className={this.props.className} id={this.props.id} onSubmit={this.handleSubmit.bind(this)}>
                <input className="input" name="name" type="text" placeholder="name" onChange={this.handleChange.bind(this)} />
                <input className="input" name="email" type="text" placeholder="email" onChange={this.handleChange.bind(this)} />
                <textarea className="text" name="message" placeholder="your message" onChange={this.handleChange.bind(this)} />
                <input disabled={this.validateInput()} className="submit" type="submit" value={
                    this.validateInput() ? "Please fill out all fields" : "Send"
                } />
            </form>
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
        appendComment: ( comment ) => dispatch( appendComment( comment ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)