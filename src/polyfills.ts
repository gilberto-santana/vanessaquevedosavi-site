// Polyfill para global e exports necessário para Supabase
if (typeof global === 'undefined') {
  window.global = window;
}

if (typeof exports === 'undefined') {
  window.exports = {};
}

if (typeof module === 'undefined') {
  window.module = { exports: {} };
}

if (typeof Buffer === 'undefined') {
  window.Buffer = {
    from: function(str) { return new TextEncoder().encode(str); },
    alloc: function(size) { return new Uint8Array(size); }
  };
}