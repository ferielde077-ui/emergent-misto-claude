<?php
/**
 * Theme functions for TapReview WP editable theme
 */

if ( ! function_exists( 'tapreview_setup' ) ) {
    function tapreview_setup() {
        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );
        // Post thumbnails
        add_theme_support( 'post-thumbnails' );
        // HTML5 support
        add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
        // Gutenberg support
        add_theme_support( 'wp-block-styles' );
        add_theme_support( 'align-wide' );
        add_theme_support( 'responsive-embeds' );
        add_theme_support( 'editor-styles' );

        register_nav_menus( array(
            'primary' => __( 'Primary Menu', 'tapreview-wp' ),
        ) );
    }
}
add_action( 'after_setup_theme', 'tapreview_setup' );

function tapreview_scripts() {
    // Enqueue the main stylesheet from this theme (style.css)
    wp_enqueue_style( 'tapreview-style', get_stylesheet_uri(), array(), filemtime( get_stylesheet_directory() . '/style.css' ) );

    // Fallback: also enqueue the original site's CSS and JS from the repo raw URLs so the initial look matches the static page
    wp_enqueue_style( 'tapreview-legacy', 'https://raw.githubusercontent.com/ferielde077-ui/emergent-misto-claude/main/style.css', array(), null );

    wp_enqueue_script( 'tapreview-main', 'https://raw.githubusercontent.com/ferielde077-ui/emergent-misto-claude/main/script.js', array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'tapreview_scripts' );

// Allow SVG uploads (optional convenience for product images/icons)
function tapreview_mime_types( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'tapreview_mime_types' );

// Simple helper to echo an image URL that falls back to the repo raw file if not present in theme
function tapreview_asset_url( $path ) {
    $local = get_stylesheet_directory_uri() . '/' . ltrim( $path, '/' );
    return $local;
}
