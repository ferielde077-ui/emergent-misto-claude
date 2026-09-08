<?php
/**
 * Template Name: Pagina Prodotti
 * Description: Pagina che mostra l'archivio dei prodotti registrati (post type 'product').
 */
get_header();
?>
<main id="site-content" role="main">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="page-title"><?php the_title(); ?></h1>
    <?php
    $args = array(
      'post_type' => 'product',
      'posts_per_page' => 12,
    );
    $loop = new WP_Query( $args );
    if ( $loop->have_posts() ) :
      echo '<div class="product-gallery-grid">';
      while ( $loop->have_posts() ) : $loop->the_post();
        ?>
        <figure class="product-gallery-item">
          <a href="<?php the_permalink(); ?>">
            <div class="product-gallery-thumb">
              <?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'medium' ); } else { echo '<img src="' . esc_url( tapreview_asset_url( 'assets/images/img-1.jpg' ) ) . '" alt="' . esc_attr( get_the_title() ) . '">'; } ?>
            </div>
            <figcaption class="px-5 py-4 text-sm text-zinc-400"><?php the_title(); ?></figcaption>
          </a>
        </figure>
        <?php
      endwhile;
      echo '</div>';
      wp_reset_postdata();
    else :
      echo '<p>' . esc_html__( 'Nessun prodotto pubblicato.', 'tapreview-wp' ) . '</p>';
    endif;
    ?>
  </div>
</main>
<?php get_footer();
