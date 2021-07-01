import Joi from 'joi';
import { CollectionReportRecordSchema } from './collectionReportRecord.model';

const schema = Joi.object({
    organization: Joi.object({
        name: Joi.string().required(),
        address: Joi.optional()
    }),
    dollarRate: Joi.number().required(),
    day: Joi.string().required(),
    month: Joi.string().required(),
    records: Joi.array().items(CollectionReportRecordSchema),
    sum: Joi.number()
});

export default class CollectionReportModel {
    organization: any;
    dollarRate: any;
    day: any;
    month: any;
    records: any;
    sum: any;
    constructor(data: { organization: any; dollarRate: any; day: any; month: any; records: any; sum: any; }) {

        try {
            const value = schema.validate(data);
        }
        catch (err) {
            console.log(err);
        };

        const { organization, dollarRate, day, month, records, sum } = data;
        this.organization = organization;
        this.dollarRate = dollarRate;
        this.day = day;
        this.month = month;
        this.records = records.sort((preRec: any, rec: any) => preRec.name.localeCompare(rec.name));
        this.sum = sum;

    }

}