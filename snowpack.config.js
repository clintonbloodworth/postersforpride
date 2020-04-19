module.exports = {
  dedupe: ['lit-html'],
  installOptions: {
    dest: 'modules',
    optimize: process.env.NODE_ENV === 'production',
  },
  strict: true,
  webDependencies: [
    'focus-visible',
    'lit-html',
    'lit-element',
    'lit-html/directives/class-map.js',
    'lit-html/directives/unsafe-html.js',
  ],
};
