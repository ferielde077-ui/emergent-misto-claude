<?php
// Basic index - uses page templates and the block editor for content
get_header();
?>
<main id="site-content" role="main">
  <?php
  if ( have_posts() ) :
    while ( have_posts() ) : the_post();
      the_content();
    endwhile;
  else :
    echo '<p>' . esc_html__( 'No content found. Create a page and set it as the Front Page in Settings → Reading.', 'tapreview-wp' ) . '</p>';
  endif;
  ?>
</main>

<?php
get_footer();
