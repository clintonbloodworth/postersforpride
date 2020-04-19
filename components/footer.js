import { LitElement, html, css } from '/modules/lit-element.js';
import global$ from '/styles/global.js';
import '/elements/button.js';

class Footer extends LitElement {
  static get styles() {
    return [
      global$,
      css`
        .footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 64px;
          background-color: var(--colors-pink);
          color: var(--colors-white);
          justify-content: center;
          padding: 50px 100px;
        }

        .column {
          display: grid;
          grid-gap: 16px;
        }

        .heading {
          font-size: 1.2rem;
          line-height: 1.7;
          text-transform: uppercase;
        }

        .description {
          font-size: 0.875rem;
          line-height: 1.8;
        }

        .copyright {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        @media (max-width: 1024px) {
          .footer {
            grid-gap: 32px;
            grid-template-columns: 1fr;
            padding: 40px 55px;
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
  onClick() {
    this.count += 1;
    this.message = 'mannn';
  }
  render() {
    return html` <footer class="footer"> <div class="column">
          <h2 class="heading">
            A Poster Show Celebrating Lgbt Pride and Benefiting Equality
            Illinois
          </h2>

          <p class="description">
            Posters for Pride is a poster exhibition that benefits Equality
            Illinois, an advocacy organization that works to protect civil
            rights and end discrimination against LGBT individuals. Artists and
            designers from around the country were asked to react visually to
            pride & equality in the form of a screen printed or letterpress
            poster.
          </p>

          <p>
            <small class="copyright">
              © ${new Date().getFullYear()} Idiot Pull
            </small>
          </p>
        </div>

        <div class="column">
          <h2 class="heading">
            Donate to Equality Illinois
          </h2>

          <p class="description"> The mission of Equality Illinois is to secure, protect and defend
            equal rights for lesbian, gay, bisexual and transgender people in
            Illinois.
          </p>

          <x-button label="Make a Donation"></x-button>
        </div>
      </footer>
    `;
  }
}

customElements.define('x-footer', Footer);
