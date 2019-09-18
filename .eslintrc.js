module.exports = {
  "parserOptions": {
    "ecmaVersion": 9
  },
  "env": {
    "browser": true,
  },
  "extends": "airbnb-base",
  "plugins": [ "import" ],
  "rules": {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    "no-console": "warn",
    "quotes": [ "error", "single" ],
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
  }
};