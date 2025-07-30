import '@testing-library/jest-dom';

// Полифиллы для TextEncoder/TextDecoder
// @ts-ignore
if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore
  global.TextEncoder = require('util').TextEncoder;
  // @ts-ignore
  global.TextDecoder = require('util').TextDecoder;
}