exports.getAll = (Model, populateOptions) => async (req, res) => {
    try {
        let query = Model.find(req.findOptions);

        if (populateOptions)
            query = query.populate(populateOptions);

        const docs = await query;

        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: {
                documents: docs
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getOne = (Model, populateOptions) => async (req, res) => {
    try {
        let query = Model.findById(req.params.id);

        if (populateOptions)
            query = query.populate(populateOptions);

        const doc = await query;

        if (!doc)
            throw 'No document found with that ID';     // 404

        res.status(200).json({
            status: 'success',
            data: {
                document: doc
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateOne = Model => async (req, res) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc)
            throw 'No document found with that ID';     // 404

        res.status(200).json({
            status: 'success',
            data: {
                document: doc
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        });
    }
}

exports.createOne = Model => async (req, res) => {
    try {
        const newDoc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                document: newDoc
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        });
    }
}

exports.deleteOne = Model => async (req, res) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc)
            throw 'No document found with that ID';     // 404

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}