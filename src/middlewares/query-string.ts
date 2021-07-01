import { Request, Response, NextFunction } from 'express';


export const queryString = (req: any,
    res: Response,
    next: NextFunction) => {
    // let { sort, filter, range } = req.query;
    // sort = [JSON.parse(sort as string || '[]')];
    // filter = JSON.parse(filter as string || '{}');
    // range = JSON.parse(range as string || '[0, -1]');
    // let limit = (range as Array<any>)[1] - (range as Array<any>)[0] + 1;
    // let skip = (range as Array<any>)[0];
    // let start = (range as Array<any>)[0];
    // let end = (range as Array<any>)[1];

    // if (Array.isArray(filter.id)) {
    //     filter = { _id: { $in: filter['id'] } }
    // }

    // if (filter.name) {
    //     filter.name = { $regex: new RegExp(filter.name, 'i') }
    // }

    // if (filter.lastName) {
    //     filter.lastName = { $regex: new RegExp(filter.lastName, 'i') }
    // }


    // req.query = {
    //     sort,
    //     filter,
    //     limit,
    //     skip,
    //     start,
    //     end,
    // }
    // next();
}