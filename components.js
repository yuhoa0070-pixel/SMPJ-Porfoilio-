/*
 * components.js — small native Web Components layer for the SM site.
 *
 * No build step, no framework: plain custom elements defined with
 * `customElements.define` that render their markup synchronously via
 * `innerHTML` in `connectedCallback`. Because the browser upgrades a
 * custom element as soon as its closing tag is parsed, the header,
 * footer, and booking modal are already in the DOM by the time
 * script.js runs (script.js is loaded after this file, right before
 * </body>), so every id/class it queries (#book-me-btn, #booking-modal,
 * #theme-toggle, #year, .site-header, .site-footer, .listening, etc.)
 * still exists and behaves exactly as before.
 *
 * Markup, ids and classes below are copied verbatim from the previous
 * per-page HTML — this file only removes duplication, it does not
 * change output.
 */
(() => {
  'use strict';

  const MONOGRAM_SVG = `<svg class="brand-monogram" viewBox="0 0 40 29" aria-hidden="true"><path class="monogram-body" d="M2 27V2h7l11 14L31 2h7v25h-7V13L20 27 9 13v14H2Z"/><path class="monogram-signal" d="M20 16 31 2"/></svg>`;

  const MARK = `<a class="mark" href="index.html" aria-label="SM home">${MONOGRAM_SVG}</a>`;

  const BOOK_BTN = `<button class="site-button call-button" id="book-me-btn" type="button">Book me</button>`;

  /* ---------------------------------------------------------------- */
  /* <site-header active="work|about">                                 */
  /* ---------------------------------------------------------------- */
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      this.classList.add('site-header');
      const active = this.getAttribute('active') || '';
      const current = (key) => (active === key ? ' aria-current="page"' : '');
      this.innerHTML = `
      ${MARK}
      <nav aria-label="Primary navigation">
        <a href="work.html"${current('work')}>Work</a>
        <a href="about.html"${current('about')}>About</a>
        ${BOOK_BTN}
      </nav>`;
    }
  }

  /* ---------------------------------------------------------------- */
  /* <site-footer></site-footer>                                       */
  /* ---------------------------------------------------------------- */
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.classList.add('site-footer');
      this.innerHTML = `
      <div class="socials" aria-label="Social links">
        <a href="#" aria-label="X">𝕏</a>
        <a href="#" aria-label="Instagram">◎</a>
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="GitHub">◉</a>
      </div>
      <p>© <span id="year"></span> Made with <span class="heart">♥</span> by <strong>SM</strong></p>
      <div class="utilities">
        <a class="download-button" href="assets/Mao-Sokmean-Profile.txt" download="Mao-Sokmean-Profile.txt" aria-label="Download Mao Sokmean profile"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2v10m0 0 4-4m-4 4L6 8M3 15v2h14v-2" /></svg></a>
        <a href="#top" aria-label="Back to top">↑</a>
        <button id="theme-toggle" type="button" aria-label="Toggle dark theme">☼</button>
      </div>`;
    }
  }

  /* ---------------------------------------------------------------- */
  /* <booking-modal></booking-modal>                                    */
  /* ---------------------------------------------------------------- */
  class BookingModal extends HTMLElement {
    connectedCallback() {
      this.classList.add('booking-modal');
      if (!this.id) this.id = 'booking-modal';
      this.setAttribute('aria-hidden', 'true');
      this.innerHTML = `
      <div class="booking-overlay" data-close-modal></div>
      <div class="booking-panel" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button class="booking-close" type="button" data-close-modal aria-label="Close booking form">×</button>
        <p class="eyebrow">Let's work together</p>
        <h2 id="booking-title">Book me</h2>
        <p class="booking-sub">Tell us a bit about your project and we'll get back to you.</p>
        <form class="booking-form" id="booking-form">
          <label>Name<input type="text" name="name" required /></label>
          <label>Email<input type="email" name="email" required /></label>
          <label>Project details<textarea name="details" rows="4" required></textarea></label>
          <button class="site-button booking-submit" type="submit">Send request</button>
        </form>
        <p class="booking-success" id="booking-success" hidden>Thanks — we'll be in touch shortly.</p>
      </div>`;
    }
  }

  /* ---------------------------------------------------------------- */
  /* <listening-widget></listening-widget>                              */
  /* ---------------------------------------------------------------- */
  class ListeningWidget extends HTMLElement {
    connectedCallback() {
      this.classList.add('listening');
      this.setAttribute('aria-label', 'Listening status');
      this.innerHTML = `
      <span class="sound-mark">≋</span>
      <strong>Now playing</strong><i>·</i><span>Studio Radio</span><i>·</i><span>SM</span>`;
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
  customElements.define('booking-modal', BookingModal);
  customElements.define('listening-widget', ListeningWidget);
})();
