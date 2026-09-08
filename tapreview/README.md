# TapReview WP editable theme - aggiornamenti

Ho tradotto la pagina in italiano, aggiunto un Custom Post Type "Prodotti" e creato template per l'archivio e per il singolo prodotto.

Cosa è stato aggiunto in questo commit sul branch feature/wp-theme-editable-v2:
- Traduzione dei testi visibili nella homepage (index.php) e nella description.
- Miglioramento dell'accordion FAQ e traduzione delle risposte.
- Registrazione del Custom Post Type `product` (Prodotti) per aggiungere/modificare prodotti dal pannello WP.
- Template: `single-product.php`, `archive-product.php` e `page-products.php`.
- Auto-scroll della sezione hero tramite `assets/js/auto-scroll.js`, configurabile da Appearance → Customize → Comportamento tema (imposta i secondi dopo i quali partire; 0 = disabilitato).
- Migliorie alla barra di navigazione: mostra una lista fallback di pagine se non è impostato alcun menu.

Come regolare lo scorrimento automatico della prima sezione:
1. Vai in Aspetto → Personalizza → Comportamento tema.
2. Modifica il valore "Auto-scroll sezione iniziale (secondi, 0 = disabilitato)" impostando il numero di secondi desiderato.
3. Salva e pubblica: il sito userà quel valore e partirà automaticamente dopo il tempo impostato. L'auto-scroll si annulla se l'utente interagisce (scroll, click, keyboard).

Come aggiungere/modificare prodotti:
1. Nel pannello WordPress trovi la voce "Prodotti".
2. Aggiungi un nuovo prodotto (titolo, contenuto descrittivo, immagine in evidenza). Puoi usare l'editor a blocchi per aggiungere paragrafi, immagini, liste, ecc.
3. Per mostrare i prodotti in una pagina, crea una nuova pagina usando il template "Pagina Prodotti" o visita l'archivio /prodotti.

Se vuoi che copi anche le immagini e i font nella cartella del tema (consigliato per performance e per lavorare offline), lo faccio nel prossimo passo e aggiorno i riferimenti a file locali.
