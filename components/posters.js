import { LitElement, html, css } from '/modules/lit-element.js';
import global$ from '/styles/global.js';

class Posters extends LitElement {
  static get styles() {
    return [
      global$,
      css`
        .posters {
          display: grid;
          grid-gap: 32px;
          grid-template-columns: repeat(4, max-content);
          justify-content: center;
          margin-block-start: 72px;
          margin-block-end: 72px;
        }

        @media (max-width: 1024px) {
          .posters {
            grid-template-columns: repeat(2, max-content);
          }
        }

        .poster-link {
          display: block;
          position: relative;
        }

        .poster-link:hover .poster-details {
          opacity: 1;
          transform: scale(1);
        }

        .poster {
          width: 250px;
        }

        .poster-details {
          align-items: center;
          background-color: var(--colors-purple);
          color: var(--colors-white);
          content: '';
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          left: 0;
          opacity: 0;
          padding: 16px;
          position: absolute;
          top: 0;
          transform: scale(0.95);
          transition: opacity 250ms, transform 250ms;
          width: 100%;
        }

        .poster-title {
          font-weight: 500;
          letter-spacing: 1.5px;
          text-align: center;
          text-transform: uppercase;
        }

        .poster-creator {
          font-size: 0.75rem;
          letter-spacing: 1.2px;
          margin-block-end: 0;
          margin-block-start: 8px;
          text-transform: uppercase;
        }

        .poster-price {
          font-size: 1.5rem;
          margin-bottom: 0;
          margin-top: 32px;
        }

        .image {
          display: block;
          max-width: 100%;
        }


        @media (max-width: 1024px) {
          .poster {
            width: 40vw;
          }
        }
      `,
    ];
  }
  constructor() {
    super();
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
    return html`
      <ul class="posters">
        ${Object.entries(window.posters).map(([key, poster]) => {
          return html`
            <li class="poster">
              <a
                class="poster-link"
                href="/poster/${key}"
                @click="${this.route}"
              >
                <img alt="" class="image" src="/images/${poster.images[0]}" />

                <div class="poster-details">
                  <h3 class="poster-title">${poster.title}</h3>
                  <p class="poster-creator">${poster.creator}</p>
                  <p class="poster-price">${poster.price}</p>
                </div>
              </a>
            </li>
          `;
        })}
      </ul>
    `;
  }
}

customElements.define('x-posters', Posters);
