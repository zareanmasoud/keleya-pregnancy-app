const fs = require("fs");

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "")
    .replace(/[\. ,:@_-]+/g, "");
}

const files = fs.readdirSync("../assets/images/");
const obj = files.reduce((acc, cur) => ({ ...acc, ...{ [camelize(cur)]: `@assets/images/${cur}` } }), {});
fs.writeFile("../src/resources/images.js", `export const images = ${JSON.stringify(obj)}`, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
