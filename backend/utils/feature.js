class ApiFeatures {
    constructor(query, querykey) {
        this.query = query;
        this.querykey = querykey;
    }

    search() {
        const keyword = this.querykey.keyword ? {
            name: {
                $regex: this.querykey.keyword,
                $options: "i"
            }
        } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }


    filter() {
        const queryfilter = { ...this.querykey };
        const removeFields = ["keyword", "page", "limit"];


        removeFields.forEach((q) => delete queryfilter[q]);
        let querykey = JSON.stringify(queryfilter);

        // Price and range filter
        querykey = querykey.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(querykey));
        return this;
    }
    pagination(dataperpage) {
        const currentPage = +this.querykey.page || 1;

        const skip = (currentPage - 1) * dataperpage;
        this.query = this.query.limit(dataperpage).skip(skip);
        return this
    }
}


module.exports = ApiFeatures;