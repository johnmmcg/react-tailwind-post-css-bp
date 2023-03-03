/*
  This is a postinstall script to overwrite the react scripts webpack with the root level postcss.config.js
  https://stackoverflow.com/questions/70665302/getting-the-error-nested-css-was-detected-but-css-nesting-has-not-been-configu/72097591#72097591
*/

const fs = require('fs');

fs.readFile('node_modules/react-scripts/config/webpack.config.js', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const result = data.replace("'postcss-flexbugs-fixes',", "'postcss-flexbugs-fixes','postcss-nesting',").replace("'tailwindcss',", "'tailwindcss/nesting', 'tailwindcss',");

  fs.writeFile('node_modules/react-scripts/config/webpack.config.js', result, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    return;
  });
  return console.log('postinstall-script: overwrote react script webpack.config.js');
});