<?php
/**
 * Front page: render the content of the static page set in Settings → Reading.
 */
get_header();
?>
<main id="site-content" role="main">
<?php
$front_id = get_option( 'page_on_front' );
if ( $front_id ) {
    $post = get_post( $front_id );
    setup_postdata( $post );
    the_content();
    wp_reset_postdata();
} else {
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
            the_content();
        endwhile;
    else :
        echo '<p>' . esc_html__( 'Nessuna pagina impostata come Home. Crea una pagina e impostala come Front Page in Impostazioni → Lettura.', 'tapreview-wp' ) . '</p>';
    endif;
}
?>
</main>
<?php get_footer();
