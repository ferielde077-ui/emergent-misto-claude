=== TapReview Landing ===
Requires at least: 6.0
Requires PHP: 7.4
License: Proprietary

INSTALLAZIONE
1. Comprimi l'intera cartella "tapreview-theme" in un file .zip
   (se hai scaricato già lo zip fornito, salta questo passaggio).
2. Nel tuo pannello WordPress vai su: Aspetto -> Temi -> Aggiungi nuovo -> Carica tema.
3. Seleziona il file .zip e clicca "Installa ora", poi "Attiva".

COSA FA QUESTO TEMA
E' un tema "single-page": la home page (e in pratica ogni URL del sito)
mostra sempre la stessa landing page TapReview con hero animato,
galleria prodotto con foto reali, configuratore prezzo, calcolatore ROI,
recensioni e FAQ. Non usa il Loop di WordPress, non ha template per
articoli/pagine separate e i testi non sono modificabili dal pannello
Personalizza: sono scritti direttamente in index.php.

PER MODIFICARE I TESTI O I PREZZI
Apri index.php con un editor di codice e modifica direttamente l'HTML
(cerca il testo che vuoi cambiare). I prezzi e le percentuali usati dal
configuratore/calcolatore ROI sono anche duplicati in script.js
(costanti MATERIALS, PACKS, CONVERSION_RATE, VALUE_PER_REVIEW) — se
cambi un prezzo in un punto, cambialo anche nell'altro.

IL PULSANTE DI CHECKOUT
Il pulsante "Add to Cart — Checkout with Stripe" mostra solo un avviso
dimostrativo (nessun pagamento reale). Per venderli davvero dovrai
collegare un plugin Stripe/WooCommerce o un tuo endpoint di checkout
in script.js (funzione initConfigurator, gestore click di
"stripe-checkout-button").

CREDITI IMMAGINI
Le foto reali del prodotto in assets/images/products/ sono quelle che
hai fornito tu. Due immagini che avevi caricato (con i loghi
"reviewcard.shop" e "Powered by ...") sono state escluse perché
mostravano il marchio di un altro venditore.
