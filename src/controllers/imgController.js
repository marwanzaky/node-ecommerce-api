const path = require('path');

exports.getImgId = (req, res) => {
    const pathImgId = path.resolve(__dirname, `../../img/products/${req.params.name}/img-${req.params.index}.jpg`);
    res.status(200).sendFile(pathImgId);
}