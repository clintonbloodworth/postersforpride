import { LitElement, html, css } from '/modules/lit-element.js';
import global$ from '/styles/global.js';

class Quantity extends LitElement {
  static formAssociated = true;
  static get properties() {
    return {
      value: { type: String },
    };
  }
  static get styles() {
    return [
      global$,
      css`
        :host {
          display: inline-block;
        }

        .input {
          border: 1px solid #d1d0cf;
          border-radius: 2px;
          display: inline-block;
          height: 48px;
          height: 48px;
          text-align: center;
          width: 48px;
        }
      `,
    ];
  }
  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.value_ = this.value;
  }
  get value() {
    return '2';
  }
  formResetCallback() {
      this.value = undefined;
      this.internals.setFormValue(this.value);
    }
  set value(value) {
    this.value_ = value;
  }
  get form() {
    return this.internals_.form;
  }
  get name() {
    return 'quantity'
  }
  connectedCallback() {
    super.connectedCallback();
    window.applyFocusVisiblePolyfill(this.shadowRoot);
  }
  onInput(event) {
    this.internals_.setFormValue(event.data);
  }
  render() {
    return html`
      <input
        @input="${this.onInput}"
        class="input"
        name="quantity"
        type="text"
        value="${this.value || 1}">
    `;
  }
}

customElements.define('x-quantity', Quantity);
