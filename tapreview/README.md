# TapReview WP editable theme

This branch (feature/wp-theme-editable) adds a WordPress theme in /tapreview with support for the block editor so you can easily add pages and edit text, images, and blocks.

Quick start:
1. Download or copy the `tapreview` folder to `wp-content/themes/` in your WordPress installation.
2. Activate the theme in Appearance → Themes.
3. Create a page (e.g., "Home"), add blocks/content, then go to Settings → Reading and set that page as the static Front Page.
4. Upload product images in Media → Add New and use them in pages or the product gallery block.

Notes:
- The theme enqueues the original static site's CSS and JS from the repository raw URLs to preserve the initial look. You can remove or replace those references in `tapreview/functions.php` if you prefer to host assets locally.
- All changes are committed on branch `feature/wp-theme-editable`.
