import "@testing-library/jest-dom";

// Полифиллы для TextEncoder/TextDecoder
// @ts-ignore
if (typeof global.TextEncoder === "undefined") {
  // @ts-ignore
  global.TextEncoder = require("util").TextEncoder;
  // @ts-ignore
  global.TextDecoder = require("util").TextDecoder;
}

// Мок для IntersectionObserver
(globalThis as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
};
