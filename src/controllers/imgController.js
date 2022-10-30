const path = require('path');

exports.getImgProduct = (req, res) => {
    const img = path.resolve(__dirname, `../../img/products/${req.params.name}/img-${req.params.index}.jpg`);
    res.status(200).sendFile(img);
}

exports.getImgUser = (req, res) => {
    console.log(req.params.name);
    const img = path.resolve(__dirname, `../../img/users/${req.params.name}`);
    res.status(200).sendFile(img);
}