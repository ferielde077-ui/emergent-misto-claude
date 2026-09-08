<?php
/*
Archive for products
*/
get_header();
?>
<main id="site-content" role="main">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="archive-title"><?php post_type_archive_title(); ?></h1>
    <div class="product-gallery-grid">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <figure class="product-gallery-item">
          <a href="<?php the_permalink(); ?>">
            <div class="product-gallery-thumb">
              <?php if ( has_post_thumbnail() ) {
                the_post_thumbnail( 'medium' );
              } else {
                // fallback: use a placeholder
                echo '<img src="' . esc_url( tapreview_asset_url( 'assets/images/img-1.jpg' ) ) . '" alt="' . esc_attr( get_the_title() ) . '">';
              }
              ?>
            </div>
            <figcaption class="px-5 py-4 text-sm text-zinc-400"><?php the_title(); ?></figcaption>
          </a>
        </figure>
      <?php endwhile; else : ?>
        <p><?php esc_html_e( 'Nessun prodotto trovato.', 'tapreview-wp' ); ?></p>
      <?php endif; wp_reset_postdata(); ?>
    </div>
  </div>
</main>
<?php get_footer();
