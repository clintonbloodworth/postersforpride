import { css } from '/modules/lit-element.js';

export default css`
  :host {
    --colors-black: #222423;
    --colors-dark-orange: #ce9559;
    --colors-grey: #bbbbbb;
    --colors-orange: #f0ad67;
    --colors-pink: #885fa1;
    --colors-purple: #573c67;
    --colors-white: #ffffff;
    --font-family: Raleway, sans-serif;

    font-family: var(--font-family);
  }

  :host:focus:not(.focus-visible) {
    outline: none;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    font-family: var(--font-family);
  }

  button {
    border-width: 0;
    background: transparent;
    font-family: var(--font-family);
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-end: 0;
    margin-block-start: 0;
  }

  input {
    border-width: 0;
    padding: 0;
  }

  ol {
    list-style-type: none;
    margin-block-end: 0;
    margin-block-start: 0;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  ul {
    list-style-type: none;
    margin-block-end: 0;
    margin-block-start: 0;
    padding-left: 0;
  }

  :focus:not(.focus-visible) {
    outline: none;
  }
`;
