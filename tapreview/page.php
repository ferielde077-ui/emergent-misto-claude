<?php
/*
Template for pages - uses block content so you can edit freely with Gutenberg.
*/
get_header();
?>
<main id="site-content" role="main">
  <?php
  while ( have_posts() ) : the_post();
    echo '<article class="page-content">';
    the_content();
    echo '</article>';
  endwhile;
  ?>
</main>
<?php get_footer();
