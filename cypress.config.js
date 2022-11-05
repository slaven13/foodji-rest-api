const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://stage-2-master.foodji.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
