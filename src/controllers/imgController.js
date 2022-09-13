const path = require('path');

exports.getImgId = (req, res) => {
    const pathImgId = path.resolve(__dirname, `../../img/products/${req.params.name}/img-${req.params.index}.png`);
    console.log(pathImgId);
    res.status(200).sendFile(pathImgId);
}

exports.getImgInstaId = (req, res) => {
    const pathImgInstaId = path.resolve(__dirname, `../../img/instagram/${req.params.name}`);
    res.status(200).sendFile(pathImgInstaId);
}