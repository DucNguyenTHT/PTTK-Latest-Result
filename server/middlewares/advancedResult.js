const advancedResult = (model,populate,request) => async (req,res,next) => {
    let query;

    //copy req.query
    const reqQuery = {...req.query}
    //Fields to exclude
    const removeFields = ['select','sort','page','limit'];
    //loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Create operators ($gt,$gte,...)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    //finding resource
    query = model.find(JSON.parse(queryStr));
    
    //select fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //Sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query = query.sort('');
    }

    //pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await model.countDocuments();


    query = query.skip(startIndex).limit(limit);

    if(populate){
        query = query.populate(populate)
    }
    //executing query
    const results = await query;

    //pagination result
    const pagination = {};
    
    if(endIndex<total){
        pagination.next = {
            page:page+1,
            limit
        }
    }
    if(startIndex > 0){
        pagination.prev = {
            page:page-1,
            limit
        }
    }

    res.advancedResult = {
        success:true,
        total:Math.ceil(total/limit),
        count:results.length,
        pagination,
        data:results
    }

    next();
}

module.exports = advancedResult