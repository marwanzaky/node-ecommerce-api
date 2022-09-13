exports.getImgId = (req, res) => {
    res.status(200).sendFile(`${__dirname}/img/products/${req.params.name}/img-${req.params.index}.png`);
}

exports.getImgInstaId = (req, res) => {
    console.log(`${__dirname}/../../img/instagram/${req.params.name}`);
    res.status(200).sendFile(`${__dirname}/img/instagram/${req.params.name}`);
}