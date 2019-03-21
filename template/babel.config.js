module.exports = {
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-async-to-generator",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "~": "./src"
        }
      }
    ]
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry"
      }
    ],
  ]
}

