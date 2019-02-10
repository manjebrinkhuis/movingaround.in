import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getAndSetPost } from "../../redux/actions";

import "../../styles/Tile.css";

import { formatDate, cartesianToPolar, findDeepestCategory } from "../../utils/helpers";

class Tile extends Component {

    setUrl( slug ) {
        const { categories, posts } = this.props.blog;
        const category = findDeepestCategory(this.props.categories, categories);
        const url = "/" +category.slug+ "/" + slug;

        this.props.getAndSetPost({ slug }, posts);
        this.props.history.push( url );
    }

    render() {

        const date = new Date( this.props.acf.date );
        const imgUrl = this.props._embedded["wp:featuredmedia"][0].source_url;
        const { lat, lng } = this.props.acf.coordinates;
        const { a } = cartesianToPolar( lat, lng );

        return (
            <div 
                className="tile-container">
                <div className="tile" style={{
                    backgroundColor: "hsl(" + a + ", 40%, 90%)" 
                }}>
                    <div className="tile-header" style={{ backgroundImage: "url("+imgUrl+")" }}>
                        <h1 dangerouslySetInnerHTML={{__html: this.props.title.rendered}}></h1>
                        <h2>{formatDate( date )}</h2>
                    </div>
                    <div className="tile-content">
                        <div  dangerouslySetInnerHTML={{__html: this.props.excerpt.rendered}} />
                        <button onClick={() => this.setUrl(this.props.slug)}>Read</button>
                    </div>                    
                </div>
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
        getAndSetPost: ( slug, posts ) => dispatch( getAndSetPost( slug, posts ))
    }
}


export default withRouter(
    connect( mapStateToProps, mapDispatchToProps )(Tile)
) 