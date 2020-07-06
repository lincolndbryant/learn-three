const importAll = (require) =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const svgFiles = importAll(require.context("./", true, /\.svg$/));

export default svgFiles;
