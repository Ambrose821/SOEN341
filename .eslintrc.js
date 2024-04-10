module.exports = {
    "extends": "eslint:recommended",
    "plugins": ["react"],
    "rules": {
        "indent": ["warn", 4], // 4-space indentation
        "semi": ["warn", "always"], // semicolons at the end of statements
        "react/jsx-uses-vars": "warn",  // now a warning; originally "error"
        "camelcase": ["warn", { "properties": "never" }], // camelCase for variable names
        "import/order": ["warn", { "newlines-between": "always" }], // newlines between import groups
        "no-unused-vars": "warn" // warn when variables are declared but not used
    }
};