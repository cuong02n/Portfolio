/* eslint-disable import/no-anonymous-default-export */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Bootstrap also defines `.collapse` (display:none for the navbar menu). If any
  // scanned source merely contains the word "collapse", Tailwind would generate
  // its own `.collapse { visibility: collapse }` utility and clobber Bootstrap's
  // navbar — hiding the nav links site-wide. Block it so the two never collide.
  blocklist: ["collapse"],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'inter': ['inter','ui-sans-serif', 'system-ui'],
      'spaceMono': ['space-mono','ui-sans-serif', 'system-ui'],
    },
    extend: {},
  },
  plugins: [],
}

