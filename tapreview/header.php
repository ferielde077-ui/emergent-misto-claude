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
            echo '<span class="site-title">' . esc_html( get_bloginfo( 'name' ) ) . '</span>';
        }
        ?>
      </a>
    </div>
    <nav class="main-navigation" aria-label="Menu principale">
      <?php
      wp_nav_menu( array(
        'theme_location' => 'primary',
        'menu_id' => 'primary-menu',
        'container' => false,
        'fallback_cb' => false,
      ) );
      // If no menu is set, show a simple list of pages so the navigation is always selectable
      if ( ! has_nav_menu( 'primary' ) ) {
          echo '<ul class="fallback-menu">';
          wp_list_pages( array( 'title_li' => '', 'depth' => 1 ) );
          echo '</ul>';
      }
      ?>
    </nav>
  </div>
</header>
