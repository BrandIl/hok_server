import Joi from 'joi';
import dateformat from 'dateformat';

export const CollectionReportRecordSchema = Joi.object({
    projectKey: Joi.string().required(),
    programNo: Joi.string().required(),
    account: Joi.string().required(),
    name: Joi.string().required(),
    startDate: Joi.optional(),
    endDate: Joi.optional(),
    sum: Joi.number(),
    telephone: Joi.optional(),
    address: Joi.optional(),
    city: Joi.optional()
});

export default class CollectionReportRecordModel {
    projectKey: any;
    programNo: any;
    account: any;
    name: any;
    startDate: any;
    endDate: any;
    sum: any;
    city: any;
    address: any;
    telephone: any;
    constructor(data: any) {

        try {
            const value = CollectionReportRecordSchema.validate(data);
            const { projectKey, programNo, account, name, endDate, sum, startDate, telephone, address, city } = data;
            this.projectKey = projectKey;
            this.programNo = programNo.toString()
            this.account = account;
            this.name = name.slice(0, 15);
            this.startDate = dateformat(startDate, "mm/yy")
            this.endDate = dateformat(endDate, "mm/yy")
            this.sum = sum;
            this.city = city;
            this.address = address;
            this.telephone = telephone;


        }
        catch (err) {
            console.log(err);
        };




    }

}