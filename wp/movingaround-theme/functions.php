<?php

function my_acf_google_map_api( $api ){
	$api['key'] = 'xxx';
	return $api;
}

add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

function custom_excerpt_length( $length ) {
	return 20;
}

add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

add_theme_support( 'post-thumbnails' ); 

function filter_rest_allow_anonymous_comments() {
    return true;
}
add_filter('rest_allow_anonymous_comments','filter_rest_allow_anonymous_comments');
?>