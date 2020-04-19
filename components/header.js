import { LitElement, html, css } from '/modules/lit-element.js';
import { classMap } from '/modules/lit-html/directives/class-map.js';
import { offscreen } from '/styles/utilities.js';
import global$ from '/styles/global.js';

class Header extends LitElement {
  static get properties() {
    return {
      variation: { type: String },
    };
  }
  static get styles() {
    return [
      global$,
      offscreen,
      css`
        .header {
          display: grid;
          grid-template-areas: ". home cart";
          grid-template-columns: 1fr max-content 1fr;
          justify-content: center;
          margin-inline-start: 64px;
          margin-inline-end: 64px;
          padding-top: 80px;
        }

        header.small {
          border-bottom: 2px solid var(--colors-grey);
          padding-bottom: 32px;
          padding-top: 32px;
        }

        .cart {
          grid-area: cart;
          height: 32px;
          justify-self: flex-end;
        }

        .home {
          align-items: center;
          grid-area: home;
        }

        @media (max-width: 1024px) {
          .header {
            margin-inline-start: 55px;
            margin-inline-end: 55px;
          }

          .large-logo {
            width: 70vw;
          }
        }
      `,
    ];
  }
  constructor() {
    super();
    this.heading = 'Posters For Pride';
    this.variation = 'small';
  }
  connectedCallback() {
    super.connectedCallback();
    window.applyFocusVisiblePolyfill(this.shadowRoot);
  }
  route(event) {
    event.preventDefault();
    window.route(event.currentTarget.href);
  }
  render() {
    const classes = {
      header: {
        small: this.variation === 'small',
      },
    };
    return html`
      <header class="header ${classMap(classes.header)}">
        <h1 class="offscreen">${this.heading}</h1>

        <a class="home" href="/" @click="${this.route}">
          ${this.variation === 'small'
            ? html`<img alt="" class="small-logo" src="/images/small-logo.png"">`
            : html`<img alt="" class="large-logo" src="/images/logo.png" />`}
        </a>

        <img alt="cart" class="cart" src="/icons/cart.svg">
      </header>
    `;
  }
}

customElements.define('x-header', Header);
