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
            'primary' => __( 'Menu principale', 'tapreview-wp' ),
        ) );
    }
}
add_action( 'after_setup_theme', 'tapreview_setup' );

// Register a custom post type for products so you can add/edit products from WP admin
function tapreview_register_product_cpt() {
    $labels = array(
        'name'               => _x( 'Prodotti', 'post type general name', 'tapreview-wp' ),
        'singular_name'      => _x( 'Prodotto', 'post type singular name', 'tapreview-wp' ),
        'menu_name'          => _x( 'Prodotti', 'admin menu', 'tapreview-wp' ),
        'name_admin_bar'     => _x( 'Prodotto', 'add new on admin bar', 'tapreview-wp' ),
        'add_new'            => _x( 'Aggiungi nuovo', 'product', 'tapreview-wp' ),
        'add_new_item'       => __( 'Aggiungi nuovo prodotto', 'tapreview-wp' ),
        'new_item'           => __( 'Nuovo prodotto', 'tapreview-wp' ),
        'edit_item'          => __( 'Modifica prodotto', 'tapreview-wp' ),
        'view_item'          => __( 'Visualizza prodotto', 'tapreview-wp' ),
        'all_items'          => __( 'Tutti i prodotti', 'tapreview-wp' ),
        'search_items'       => __( 'Cerca prodotti', 'tapreview-wp' ),
        'not_found'          => __( 'Nessun prodotto trovato.', 'tapreview-wp' ),
        'not_found_in_trash' => __( 'Nessun prodotto nel cestino.', 'tapreview-wp' )
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'prodotti' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'show_in_rest'       => true, // enable Gutenberg
    );

    register_post_type( 'product', $args );
}
add_action( 'init', 'tapreview_register_product_cpt' );

// Customizer: add a setting to control hero auto-scroll delay (seconds). 0 = disabled.
function tapreview_customize_register( $wp_customize ) {
    $wp_customize->add_section( 'tapreview_behavior', array(
        'title' => __( 'Comportamento tema', 'tapreview-wp' ),
        'priority' => 30,
    ) );

    $wp_customize->add_setting( 'tapreview_hero_autoscroll_delay', array(
        'default' => 0,
        'sanitize_callback' => 'absint',
    ) );

    $wp_customize->add_control( 'tapreview_hero_autoscroll_delay', array(
        'label' => __( 'Auto-scroll sezione iniziale (secondi, 0 = disabilitato)', 'tapreview-wp' ),
        'section' => 'tapreview_behavior',
        'type' => 'number',
        'input_attrs' => array('min' => 0, 'step' => 1),
    ) );
}
add_action( 'customize_register', 'tapreview_customize_register' );

function tapreview_scripts() {
    // Enqueue the theme stylesheet (style.css)
    wp_enqueue_style( 'tapreview-style', get_stylesheet_uri(), array(), filemtime( get_stylesheet_directory() . '/style.css' ) );

    // Enqueue the original site's stylesheet locally if present in the theme assets
    if ( file_exists( get_stylesheet_directory() . '/assets/css/style.css' ) ) {
        wp_enqueue_style( 'tapreview-legacy', get_stylesheet_directory_uri() . '/assets/css/style.css', array(), filemtime( get_stylesheet_directory() . '/assets/css/style.css' ) );
    }

    // Enqueue the main script locally if present
    if ( file_exists( get_stylesheet_directory() . '/assets/js/script.js' ) ) {
        wp_enqueue_script( 'tapreview-main', get_stylesheet_directory_uri() . '/assets/js/script.js', array(), filemtime( get_stylesheet_directory() . '/assets/js/script.js' ), true );
    }

    // Our small theme script for hero auto-scroll
    if ( file_exists( get_stylesheet_directory() . '/assets/js/auto-scroll.js' ) ) {
        wp_enqueue_script( 'tapreview-autoscroll', get_stylesheet_directory_uri() . '/assets/js/auto-scroll.js', array(), filemtime( get_stylesheet_directory() . '/assets/js/auto-scroll.js' ), true );

        // Pass the delay from the customizer to the script (seconds)
        $delay = absint( get_theme_mod( 'tapreview_hero_autoscroll_delay', 0 ) );
        wp_localize_script( 'tapreview-autoscroll', 'tapreviewAutoScroll', array( 'delay' => $delay ) );
    }
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
    $local_path = get_stylesheet_directory() . '/' . ltrim( $path, '/' );
    $local_uri  = get_stylesheet_directory_uri() . '/' . ltrim( $path, '/' );

    if ( file_exists( $local_path ) ) {
        return $local_uri;
    }

    // Fallback to the repository raw URL so images still work if you haven't copied assets into the theme folder
    $repo_raw = 'https://raw.githubusercontent.com/ferielde077-ui/emergent-misto-claude/main/' . ltrim( $path, '/' );
    return $repo_raw;
}
