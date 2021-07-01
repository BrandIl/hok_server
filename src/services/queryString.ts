import { Request, Response, NextFunction } from 'express';


export const queryString = (query: any) => {
    let { sort, filter, range } = query;
    sort = [JSON.parse(sort as string || '[]')];
    filter = JSON.parse(filter as string || '{}');
    range = JSON.parse(range as string || '[0, -1]');
    let limit = (range as Array<any>)[1] - (range as Array<any>)[0] + 1;
    let skip = (range as Array<any>)[0];
    let start = (range as Array<any>)[0];
    let end = (range as Array<any>)[1];

    if (Array.isArray(filter.id)) {
        filter = { _id: { $in: filter['id'] } }
    }
    const options = ['name', 'lastName'];

    options.forEach(field => {
        if (filter[field]) {
            filter[field] = { $regex: new RegExp(filter[field], 'i') }
        }
    });



    return {
        sort,
        filter,
        limit,
        skip,
        start,
        end,
    }
}