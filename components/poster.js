import { LitElement, html, css } from '/modules/lit-element.js';
import { unsafeHTML } from '/modules/lit-html/directives/unsafe-html.js';
import global$ from '/styles/global.js';
import '/elements/button.js';
import '/elements/quantity.js';

class Poster extends LitElement {
  static get styles() {
    return [
      global$,
      css`
        .container {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          margin: 72px 55px;
        }

        .heading {
          font-weight: 400;
          font-size: 1.5rem;
          text-transform: uppercase;
        }

        .description {
          line-height: 1.5;
        }

        .images {
          display: grid;
          grid-gap: 48px;
          grid-template-columns: max-content 1fr;
          justify-self: center;
        }

        .primary-image {
          width: 320px;
        }

        .thumbnails {
          align-content: flex-start;
          display: grid;
          grid-template-columns: 64px;
          grid-gap: 8px;
        }

        .thumbnail {
          width: 100%;
        }

        .details {
          display: grid;
          grid-gap: 16px;
          height: max-content;
        }

        .price {
          color: var(--colors-black);
          font-size: 1.5rem;
          font-weight: 500;
        }

        .creator {
          text-transform: uppercase;
        }

        .form {
          display: grid;
          grid-gap: 8px;
          grid-template-columns: max-content max-content;
        }

        @media (max-width: 1024px) {
          .container {
            grid-template-columns: 1fr;
            margin: 55px;
          }

          .images {
            gap: 24px;
            grid-template-columns: 1fr;
            justify-self: flex-start;
          }

          .primary-image {
            width: 100%;
          }

          .thumbnails {
            grid-template-columns: repeat(3, 64px);
            order: 1;
          }
        }
      `,
    ];
  }
  static get properties() {
    return {
      image: { type: String },
      poster: { type: Object },
    };
  }
  constructor() {
    super();
    this.poster = {};
    // this.quantity = 'intial quanity'
  }
  connectedCallback() {
    super.connectedCallback();
    this.image = this.poster.images[0];
    window.applyFocusVisiblePolyfill(this.shadowRoot);
  }
  changeImage(index) {
    this.image = this.poster.images[index];
  }
  addToCart() {
    const event = new CustomEvent('addtocart', {
      detail: this.poster,
    });

    this.dispatchEvent(event);
  }
  onInput(event) {
    console.log(event, 'input');
    this.quantity = event.data;
  }
  onSubmit(event) {
    console.log('submit');
  }
  onFormData({ formData }) {
    formData.append('quantity', this.quantity);
  }
  render() {
    return html`
      <div class="container">
        <div class="images">
          <ul class="thumbnails">
            ${this.poster.images.map((image, index) => {
              return html`
                <li>
                  <button
                    type="button"
                    @click=${this.changeImage.bind(this, index)}
                  >
                    <img alt="" class="thumbnail" src="/images/${image}" />
                  </button>
                </li>
              `;
            })}
          </ul>

          <img alt="" class="primary-image" src="/images/${this.image}" />
        </div>

        <div class="details">
          <h1 class="heading">
            ${this.poster.title}
          </h1>

          <p class="price">
            ${this.poster.price}
          </p>

          <p class="byline">
            ${
              this.poster.company
                ? html`
                  <span class="creator">${this.poster.creator}</span>
                  of
                  <a href="${this.poster.url}">${this.poster.company}</a>
                `
                : html`
                  <a class="creator" href="${this.poster.url}">
                    ${this.poster.creator}
                  </a>`
            }
          </p>

          <p class="description">
            ${this.poster.description}
          </p>

          <form class="form" @formdata="${this.onFormData}" @submit="${this.onSubmit}">
            <x-quantity @input="${this.onInput}" value="1"></x-quantity>

            <x-button
              label="Add to Cart"
              @click="${this.onSubmit}"
              type="submit">
            </x-button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define('x-poster', Poster);
