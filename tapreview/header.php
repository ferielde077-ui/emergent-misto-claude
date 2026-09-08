<?php
// Header template
?><!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
  <div class="wrap">
    <div class="site-branding">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
        <?php
        if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
            the_custom_logo();
        } else {
            bloginfo( 'name' );
        }
        ?>
      </a>
    </div>
    <nav class="main-navigation">
      <?php
      wp_nav_menu( array(
        'theme_location' => 'primary',
        'menu_id' => 'primary-menu',
        'container' => false,
      ) );
      ?>
    </nav>
  </div>
</header>
