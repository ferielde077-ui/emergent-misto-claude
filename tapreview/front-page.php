<?php
/* Front page: render the content of the static page set in Settings → Reading.
   If no static front page is set, fall back to the content of the latest post.
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
        echo '<p>' . esc_html__( 'No front page set. Create a page and assign it as the static front page in Settings → Reading.', 'tapreview-wp' ) . '</p>';
    endif;
}
?>
</main>
<?php get_footer();
