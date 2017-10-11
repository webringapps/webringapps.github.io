var path = require("path");
module.exports = {
    entry: {
        app: ["./static/js/main.min.js"]
    },
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/assets/",
        filename: "bundle.js"
    }
};