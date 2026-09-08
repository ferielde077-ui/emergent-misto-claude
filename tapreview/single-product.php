<?php
/*
Single product template
*/
get_header();
?>
<main id="site-content" role="main" class="product-single">
  <?php
  while ( have_posts() ) : the_post();
    echo '<article id="post-' . get_the_ID() . '" class="product-entry">';
    if ( has_post_thumbnail() ) {
      echo '<div class="product-featured">' . get_the_post_thumbnail( get_the_ID(), 'large' ) . '</div>';
    }
    echo '<h1 class="product-title">' . get_the_title() . '</h1>';
    echo '<div class="product-content">' . apply_filters( 'the_content', get_the_content() ) . '</div>';
    echo '</article>';
  endwhile;
  ?>
</main>
<?php get_footer();
