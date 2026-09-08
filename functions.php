<?php
/**
 * TapReview theme functions.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Theme setup.
 */
function tapreview_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
	add_theme_support( 'automatic-feed-links' );
}
add_action( 'after_setup_theme', 'tapreview_setup' );

/**
 * Enqueue theme styles and scripts.
 * style.css is enqueued via get_stylesheet_uri() (the file WordPress
 * requires at the theme root), and script.js sits alongside it.
 */
function tapreview_assets() {
	$theme_version = wp_get_theme()->get( 'Version' );

	wp_enqueue_style(
		'tapreview-style',
		get_stylesheet_uri(),
		array(),
		$theme_version
	);

	wp_enqueue_script(
		'tapreview-script',
		get_template_directory_uri() . '/script.js',
		array(),
		$theme_version,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'tapreview_assets' );
