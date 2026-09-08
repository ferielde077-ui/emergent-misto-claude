<?php
/**
 * Template principale convertito in pagine/moduli: tradotto in italiano e reso modificabile con blocchi.
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#0d0d0f">
<meta name="description" content="TapReview — Cartoline e supporti NFC di lusso per ristoranti, hotel, saloni e negozi. Tap. Recensisci. Distinguiti.">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<?php get_template_part( 'header' ); ?>

<div id="root">
  <div aria-hidden="true" class="grain-overlay"></div>
  <div class="bg-ink text-white min-h-screen">

    <section class="hero-canvas-bg" id="hero">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-16 reveal">
          <p class="font-mono text-xs uppercase tracking-[0.3em] text-gold/90 mb-4">Il vero prodotto</p>
          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12] max-w-3xl">Non un render. <span class="text-gold-gradient">La scheda reale.</span></h2>
          <p class="mt-4 text-base sm:text-lg text-zinc-400 max-w-xl">Foto reali dell'hardware TapReview, spedito e utilizzato da attività reali.</p>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="product-gallery-grid">
          <?php
          // gallery items (use helper to resolve asset path)
          $items = array(
            array('file' => 'assets/images/products/product-stand-pos-hero.jpg', 'caption' => 'Supporto TapReview vicino alla cassa'),
            array('file' => 'assets/images/products/product-black-card-single.jpg', 'caption' => 'Versione nero opaco — card da tavolo'),
            array('file' => 'assets/images/products/product-white-cards-fan.jpg', 'caption' => 'Versione bianco perla — pack da 3'),
            array('file' => 'assets/images/products/product-blue-nfc-qr-card.jpg', 'caption' => 'NFC + QR come backup su ogni card'),
            array('file' => 'assets/images/products/product-hand-cafe.jpg', 'caption' => 'Una vera recensione a 5 stelle'),
            array('file' => 'assets/images/products/product-desk-stand.jpg', 'caption' => 'Supporto da banco in uso quotidiano'),
          );

          foreach ( $items as $it ) :
            $url = esc_url( tapreview_asset_url( $it['file'] ) );
            ?>
            <figure class="reveal product-gallery-item">
              <div class="product-gallery-thumb"><img alt="<?php echo esc_attr( $it['caption'] ); ?>" loading="lazy" src="<?php echo $url; ?>"></div>
              <figcaption class="px-5 py-4 text-sm text-zinc-400"><?php echo esc_html( $it['caption'] ); ?></figcaption>
            </figure>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- FAQ migliorata: accordion accessibile in italiano -->
    <section class="py-12 sm:py-16 lg:py-20" id="faq">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-2xl font-bold mb-6">Domande frequenti</h3>
        <div class="faq-list">
          <div class="faq-item" data-state="closed">
            <button class="faq-trigger" aria-expanded="false" aria-controls="faq-1">Come funziona TapReview?</button>
            <div id="faq-1" class="accordion-panel" hidden>
              <div class="accordion-panel-inner">TapReview permette ai clienti di lasciare recensioni Google in modo semplice usando una card NFC o un QR code. Posiziona la card vicino alla cassa o sul tavolo e i clienti potranno recensire in pochi tap.</div>
            </div>
          </div>

          <div class="faq-item" data-state="closed">
            <button class="faq-trigger" aria-expanded="false" aria-controls="faq-2">Quali materiali usate?</button>
            <div id="faq-2" class="accordion-panel" hidden>
              <div class="accordion-panel-inner">Le card sono realizzate con materiali resistenti e finiture di alta qualità. Offriamo finiture opache e lucide a seconda del modello.</div>
            </div>
          </div>

          <div class="faq-item" data-state="closed">
            <button class="faq-trigger" aria-expanded="false" aria-controls="faq-3">Posso personalizzare il logo?</button>
            <div id="faq-3" class="accordion-panel" hidden>
              <div class="accordion-panel-inner">Sì: offriamo personalizzazione del logo e del testo sulla card. Contattaci per ordini personalizzati.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</div>

<?php get_template_part( 'footer' ); ?>

<script src="<?php echo esc_url( tapreview_asset_url( 'script.js' ) ); ?>"></script>
<?php wp_footer(); ?>
</body>
</html>
