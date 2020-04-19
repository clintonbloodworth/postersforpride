import '/modules/focus-visible.js';
import '/components/header.js';
import '/components/posters.js';
import '/components/poster.js';
import '/components/footer.js';
import global from '/styles/global.js';

import { LitElement, html, css } from '/modules/lit-element.js';

class App extends LitElement {
  static get properties() {
    return {
      poster: { type: Object },
      route: { type: String },
    };
  }
  static get styles() {
    return [
      global,
      css`
        .app {
          align-items: stretch;
          display: flex;
          display: grid;
          flex-direction: column;
          font-family: var(--font-family);
          grid-template-rows: max-content 1fr max-content;
          min-height: 100vh;
        }
      `,
    ];
  }
  constructor() {
    super();
    this.poster = {};

    const poster = window.location.pathname.split('/').pop();
    const isPosterPath = window.location.pathname.startsWith('/poster');

    if (isPosterPath && window.posters[poster]) {
      this.route = window.location.pathname;
    } else if (window.location.pathname === '/') {
      this.route = window.location.pathname;
    } else {
      window.history.pushState(null, '', '/');
      this.route = '/';
    }

    window.route = (url) => {
      const { pathname } = new URL(url);
      window.history.pushState({}, '', pathname);
      this.updatePoster();
      this.route = pathname;
      window.scrollTo(0, 0);
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.updatePoster();
    window.addEventListener('popstate', this.onPopstate.bind(this));
    window.addEventListener('scroll', this.saveScroll);
    window.applyFocusVisiblePolyfill(this.shadowRoot);
  }
  disconnectedCallback() {
    window.removeEventListener('popstate', this.onPopstate.bind(this));
    window.removeEventListener('scroll', this.saveScroll);
    super.disconnectedCallback();
  }
  onPopstate() {
    this.route = window.location.pathname;
    this.updatePoster();

    if (window.history.state) {
      window.scrollTo(0, window.history.state.scrollY);
    }
  }
  saveScroll() {
    const state = window.history.state || {};;
    window.history.replaceState(state, '', window.location.href);
  }
  updatePoster() {
    const poster = window.location.pathname.split('/').pop();

    this.poster =
      window.location.pathname.startsWith('/poster') && window.posters[poster]
        ? window.posters[poster]
        : {};
  }

  addToCart(event) {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    cart.push(event.detail);
    const json = JSON.stringify(cart);
    window.localStorage.setItem('cart', json);
  }
  render() {
    return html`
      <div class="app" style="background-image: url(/images/background.png)">
        <x-header
          variation="${this.route.startsWith('/poster') ? 'small' : ''}"
        ></x-header>

        ${this.route.startsWith('/poster')
          ? html`<x-poster .poster=${this.poster} @addtocart="${this.addToCart}"></x-poster>`
          : html`<x-posters></x-posters>`}

        <x-footer>
          <x-button label="Make a Donation"></x-button>
        </x-footer>
      </div>
    `;
  }
}

customElements.define('x-app', App);
