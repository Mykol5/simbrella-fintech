module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // For TypeScript and JSX files
      '^.+\\.js$': 'babel-jest', // For JavaScript files
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/',  // Add axios to be transformed
    ],
  };
  