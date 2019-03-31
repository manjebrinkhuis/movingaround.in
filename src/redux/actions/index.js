const URL = "https://wp.movingaround.in/wp-json";


export function request( endpoint, type, args, after=null ) {
    return dispatch => {
        const argString = args ? "?" + Object.keys(args).map( key => key +"="+ args[key]).join("&") : "";
        const url = URL + endpoint + argString;
        fetch( url ).then( response => {
            if ( response.ok ) {
                return response.json().then( response => {
                    dispatch({
                        type,
                        response
                    })
                    if ( after !== null ) {
                        dispatch( after )
                    }
                })
            } else {
                return Promise.reject( "No ok response." )
            }
        },
        error => {
            Promise.reject( error )
        })
    }
}


export function loadTrace() {
    const fields = "_fields[]=id&_fields[]=acf&_fields[]=slug&_fields[]=categories&per_page=100";
    return request( "/wp/v2/posts?"+fields, "LOAD_TRACE" )
}


export function setFooter() {
    return request( "/wp/v2/pages", "SET_FOOTER", { slug: "footer" })
}

export function setHeader() {
    return request("/wp/v2/pages", "SET_HEADER", { slug: "header" })
}

export function setCommentsHeader() {
    return request("/wp/v2/pages", "SET_COMMENTS_HEADER", { slug: "comments" })
}

export function getAndSetPost( post, posts ) {
    const { id, slug } = post;
    const selected = slug ? posts.find( p => p.slug === slug ) : posts.find( p => p.id === id );

    if ( selected ) {
        return {
            type: "SET_POST",
            response: [selected]
        }
    } else {
        if ( id ) {
            return request( "/wp/v2/posts/"+id, "SET_POST", {
                _embed: ""
            })
        } else {
            return request( "/wp/v2/posts", "SET_POST", {
                slug,
                _embed: ""
            })
        }
    }
}


export function clearPost() {
    return {
        type: "SET_POST",
        response: [null]
    }
}


export function setPosts( page, perPage, postIDs, append=false ) {
    return dispatch => {
        dispatch({ type: "REQUEST" })
        if ( postIDs ) {
            dispatch(request( "/wp/v2/posts", append ? "APPEND_POSTS" : "SET_POSTS", { 
                include: postIDs.join(","),
                per_page: perPage,
                page,
                _embed: ""
            }, {
                type: "REQUEST_SUCCESS"
            }))
        } else {
            dispatch(request( "/wp/v2/posts", append ? "APPEND_POSTS" : "SET_POSTS", {
                per_page: perPage,
                page,
                _embed: ""
            }, {
                type: "REQUEST_SUCCESS"
            }))
        }
    }
}

export function appendPosts( page, perPage, postIDs ) {
    if ( postIDs ) {
        return request( "/wp/v2/posts", "APPEND_POSTS", { 
            include: postIDs.join(","),
            per_page: perPage,
            page,
            _embed: ""
        })
    } else {
        return request( "/wp/v2/posts", "APPEND_POSTS", {
            per_page: perPage,
            page,
            _embed: ""
        })
    }
}

export function setCategories() {
    return request( "/wp/v2/categories", "SET_CATEGORIES" )
}

function wpRequest( endpoint, options ) {
    const argString = options ? "?" + Object.keys(options).map(key => key + "=" + options[key]).join("&") : "";
    return fetch( URL + endpoint + argString ).then( response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject()
    })
}

export function setComments( page, perPage, post ) {
    return dispatch =>  {
        wpRequest( "/wp/v2/comments", { 
            parent: 0,
            post, page,
            per_page: perPage
        }).then( response => {
            dispatch({
                type: "SET_COMMENTS",
                response
            })
            return response
        }).then( response => {
            const parents = response.map(comment => comment.id);
            if (parents.length) {
                wpRequest( "/wp/v2/comments", {
                    parent: parents.join(","),
                    post,
                    per_page: 100
                }).then( response => {
                    dispatch({
                        type: "SET_COMMENTS",
                        response
                    })
                })
            }
        })
    }
}

export function appendComment( comment ) {
    return {
        type: "APPEND_COMMENT",
        comment
    }
}

export function setCategory( category ) {
    return {
        type: "SET_CATEGORY",
        category
    }
}


export function unsetCategory( category ) {
    return {
        type: "UNSET_CATEGORY",
        category
    }
}


export function setDateFrom( date ) {
    return {
        type: "SET_DATE_FROM",
        date
    }
}


export function setDateTo( date ) {
    return {
        type: "SET_DATE_TO",
        date
    }
}
  

// view actions
export function scroll( value ) {
    return {
        type: "SCROLL",
        value
    }
}


export function resize( value ) {
    return {
        type: "RESIZE",
        value
    }
}


export function mouse( value ) {
    return {
        type: "MOUSE",
        value
    }
}


