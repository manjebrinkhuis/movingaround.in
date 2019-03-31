import { combineReducers } from 'redux'

function places( state = {
    names: [ "Iceland", "Argentine", "Chile", "Germany", "Netherlands" ],
}, action) {
    switch( action.type) {
        case "LOAD_PLACES":
            return state
        default:
            return state 
    }
}

function archive( state = {
    months: [ "February" ],
}, action ){
    switch( action.type ) {
        case "LOAD_ARCHIVE":
            return state
        default: 
            return state
    }
}

const html = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'

function trace( state = {
    url: `https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg`,
    width: "100%",
    height: 500,
    attribution: html,
    topLeft: [-50, 50], 
    bottomRight: [50, -50],
    trace: [],
}, action ){
    switch( action.type ){
        case "LOAD_TRACE":
            return { ...state, trace: action.response }
        case "SET_BOUNDS":
            return { 
                ...state, 
                topLeft: [
                    Math.max( action.selection.map( loc => loc.lat )),
                    Math.min( action.selection.map( loc => loc.lon ))
                ],
                bottomRight: [
                    Math.min( action.selection.map( loc => loc.lat )),
                    Math.max( action.selection.map( loc => loc.lon ))
                ]
            }
        default:
            return state
    }
}

function blog( state = {
    isFetching: false,
    posts: [],
    categories: [],
    footer: [],
    header: [],
    comments: [],
    commentsHeader: [],
    commentsPage: 1,
    commentsPerPage: 6,
    post: null,
    perPage: 9,
    page: 1,
}, action) {
    switch( action.type ){
        case "REQUEST":
            return { ...state, isFetching: true }
        case "REQUEST_SUCCESS":
            return { ...state, isFetching: false }
        case "SET_POSTS":
            return { ...state, posts: action.response, page: 1 }
        case "SET_POST":
            return { ...state, post: action.response[0], commentsPage: 1 }
        case "APPEND_POSTS":
            return { 
                ...state, 
                posts: [ ...state.posts, ...action.response ],
                page: state.page + 1
            }
        case "SET_FOOTER":
            return { ...state, footer: action.response }
        case "SET_HEADER":
            return { ...state, header: action.response }
        case "SET_CATEGORIES":
            return { ...state, categories: action.response }
        case "SET_COMMENTS_HEADER":
            return {
                ...state, commentsHeader: action.response
            }
        case "SET_COMMENTS":
            return {
                ...state,
                comments: [...state.comments, ...action.response],
            }
        case "APPEND_COMMENT":
            return { 
                ...state, 
                comments: [...state.comments, action.comment],
            }
        default:
            return state
    }
}

function filters( state = {
    dateFrom: null,
    dateTo: null,
    categories: []
}, action) {
    switch( action.type ) {
        case "SET_DATE_FROM":
            return { ...state, dateFrom: action.date }
        case "SET_DATE_TO":
            return { ...state, dateTo: action.date }
        case "SET_CATEGORY":
            const categories = [ ...state.categories, action.category ];
            const filteredCategories = categories.filter(( cat, index, arr ) => ( arr.indexOf( cat ) === index ));
            return { ...state, categories: filteredCategories }
        case "UNSET_CATEGORY":
            return { ...state, categories: state.categories.filter( cat => cat !== action.category )}
        default:
            return state
    }
}

function view( state = {
    scroll: 0,
    window: {
        x: 1280,
        y: 720
    },
    mouse: {
        x: 0,
        y: 0
    }
}, action) {
    switch( action.type ) {
        case "SCROLL":
            return state
        case "MOUSE":
            return state
        case "RESIZE":
            return state
        default:
            return state
    }
}

const rootReducer = combineReducers({
  places,
  archive,
  trace,
  filters,
  blog,
  view
})

export default rootReducer