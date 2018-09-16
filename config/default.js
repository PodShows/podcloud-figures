const fs = require("fs");
const path = require("path");

const IssuersKeys = {};

const _issuers_key_folder = path.resolve(__dirname, "./issuers_keys");
fs.readdirSync(_issuers_key_folder).forEach(file => {
  const extensionMatch = file.match(/(.*)(\.pub)$/i);
  const key =
    extensionMatch && extensionMatch.length > 1
      ? extensionMatch[1]
      : (file === "debug.key" && file) || null;

  if (key) {
    IssuersKeys[key.replace(".", "_")] = fs.readFileSync(
      path.resolve(_issuers_key_folder, file),
      "utf-8"
    );
  }
});

module.exports = {
  IssuersKeys,
  csvDir: path.resolve(__dirname, "../archives/"),
  noAuth: !!process.env.NO_AUTH
};
