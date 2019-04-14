import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';
import { withRouter } from "react-router";

import L from "leaflet";
import { connect } from "react-redux";
import "../../styles/Trace.css";

import { loadTrace, setPosts, getAndSetPost, appendPosts } from "../../redux/actions";
import { filterPosts, findDeepestCategory } from "../../utils/helpers";

class Trace extends Component {

  componentDidMount() {
    this.props.loadTrace();
  }

  setUrl( slug, postCats ) {
    const { categories, posts } = this.props.blog;
    const category = findDeepestCategory( postCats, categories );
    const url = "/" + category.slug + "/" + slug;

    this.props.getAndSetPost({ slug }, posts);
    this.props.history.push(url);

    // Scroll to post title
    document.getElementById("posts-container-outer").scrollIntoView();
  }

  createPoints( sorted ) {

    return sorted.map(( point, index ) => {
      
      const { address, lat, lng } = point.acf.coordinates;
      const { date } = point.acf;
      const { slug, categories } = point;
      const position = [ parseFloat(lat), parseFloat(lng) ];

      return (
        <CircleMarker 
          onClick={() => this.setUrl( slug, categories )}
          center={position} 
          key={index} 
          stroke={true} 
          weight={4} 
          color={"#678"} 
          fillColor={"#ffffff"} 
          fillOpacity={1}>
          <Popup>{date + " - " + address}</Popup>
        </CircleMarker>
      )
    })
  }

  render() {
    const { attribution, topLeft, bottomRight,
      url, width, height, trace } = this.props.trace;

    const sorted = trace.sort(( a, b ) => {
      return Date.parse( a.acf.date ) - Date.parse( b.acf.date )
    });

    const { categories, dateFrom, dateTo } = this.props.filters;
    const filtered = filterPosts( sorted, categories, [ dateFrom, dateTo ])

    let latL, lngL, latR, lngR;
    if ( filtered.length === 1 ) {
      const { lat, lng } = filtered[0].acf.coordinates;
      latL = parseFloat(lat)-1;
      lngL = parseFloat(lng)-1;
      latR = parseFloat(lat)+1;
      lngR = parseFloat(lng)+1;
    } else if ( filtered.length > 1 ) {
      latL = Math.min( ...filtered.map( point => parseFloat(point.acf.coordinates.lat) -5 ));
      lngL = Math.min( ...filtered.map( point => parseFloat(point.acf.coordinates.lng) -5 ));
      latR = Math.max( ...filtered.map( point => parseFloat(point.acf.coordinates.lat) +5 ));
      lngR = Math.max( ...filtered.map( point => parseFloat(point.acf.coordinates.lng) +5 ));
    } else {
      [latL, lngL] = topLeft;
      [latR, lngR] = bottomRight;
    }

    const bounds = L.latLngBounds(L.latLng(latL, lngL), L.latLng(latR, lngR));
    const coords = filtered.map( point => {
      return [
        parseFloat( point.acf.coordinates.lat ),
        parseFloat( point.acf.coordinates.lng )
      ]
    })

    return (
      <div id="leaflet-container">
        <Map style={{width, height}} bounds={bounds}>
          <TileLayer
            attribution={attribution}
            url={url} />
          {this.createPoints( filtered )}
          <Polyline positions={coords} dashArray={"4"} weight={4} color={"#678"}/>
        </Map>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    trace: state.trace,
    filters: state.filters,
    blog: state.blog
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    loadTrace: () => dispatch( loadTrace() ),
    setPosts: ( postIDs ) => dispatch( setPosts( postIDs )),
    getAndSetPost: ( post, posts ) => dispatch( getAndSetPost( post, posts )),
    appendPosts: ( postIDs ) => dispatch( appendPosts( 1, 1, postIDs ))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Trace));
