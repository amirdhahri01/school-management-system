

const advancedResults = (model, populate) => {
    return async (req, res, next) => {
        let Query = model.find();
        const name = req.query.name;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const total = await model.countDocuments();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        if(populate){
            Query = Query.populate(populate);
        }  
        const pagination = {}
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        if (name) {
            Query = Query.find({
                name: { $regex: name, $options: "i" }
            });
        }
        const results = await Query.find().skip(skip).limit(limit);
        res.results = {
            total,
            pagination,
            results,
        }
        next();
    }
}

export default advancedResults