
export function filterPosts( trace, categories, dates ) {

    const [ dateFrom, dateTo ] = dates;

    return trace.filter( point => {
        if (categories.length) {
            let match = false
            categories.forEach( cat => {
                if (point.acf.category.find( cat2 => cat2 === cat )) {
                    match = true
                }
            })
            return match
        }
        return true
    }).filter( point => {
        const date = Date.parse( point.acf.date );
        if ( dateFrom && dateTo ) {
            return ( date >= dateFrom ) && ( date <= dateTo )
        }
        return true
    })
}

export function formatDate( date ) {
    // Borrowed from 
    // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function getCatLevel( parent, wpCats, level=0 ) {
    if (parent === 0) {
        return level
    } else {
        return getCatLevel( wpCats.find( cat => cat.id === parent ).parent, wpCats, level + 1)
    }
}

function catAddLevels( wpCats ) {
    return wpCats.map( cat=> {
        cat["level"] = getCatLevel( cat.parent, wpCats )
        return cat
    })
}

export function findDeepestCategory( postCats, wpCats ) {
    const addedLevels = catAddLevels( wpCats );
    const filtered = addedLevels.filter( cat => postCats.find( cat2 => cat.id === cat2 ));
    const deepest = Math.max( ...filtered.map( cat => cat.level ));
    return filtered.find( cat => cat.level === deepest );
}

export function cartesianToPolar( x, y, shift=0 ) {
    return {
        r: Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) ),
        a: Math.atan( y/x ) * (360 / Math.PI * 2)
    }
}

export function round( val, precision ) {
    const p = Math.pow( 10, precision );
    return Math.round( val * p ) / p
}