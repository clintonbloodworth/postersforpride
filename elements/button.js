import { LitElement, html, css } from '/modules/lit-element.js';
import global$ from '/styles/global.js';





class Button extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      type: { type: String },
    };
  }
  static get styles() {
    return [
      global$,
      css`
        :host {
          display: inline-block;
        }

        button {
          background-color: var(--colors-orange);
          color: var(--colors-white);
          height: 48px;
          padding-left: 20px;
          padding-right: 20px;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 12px;
          transition: background-color 400ms;
          border-radius: 2px;
        }

        button:hover {
          background-color: var(--colors-dark-orange);
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
  render() {
    return html`
      <button @click="${this.onClick}" type="${this.type || 'button'}">
        ${this.label}
      </button>
    `;
  }
}

customElements.define('x-button', Button);
