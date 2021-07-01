

import dateFormat from 'dateformat';
import path from 'path';
import { createHtml } from '../common/htmlCreator';
import { createPdf } from '../common/pdfCreator';
import { Payment } from '../models';
import { pdfReportConfig } from '../resources/collectionReport/pdfConfig';
import CollectionReportModel from './models/collectionReport.model';
import CollectionReportRecordModel from './models/collectionReportRecord.model';



export default class CollectionReportGenerator {
    organization: any;
    collectionReader: any;
    programReader: any;
    customerReader: any;
    date: any;
    filter: any;
    dollarRate: any;

    constructor(organization: any, filter: any, date: any) {

        this.organization = organization;
        this.date = date;
        this.filter = filter;
    }

    _mapRecord(payment: any) {

        const { programKey, bankAccount, lastName, firstName, closeDate, openDate, city, street, phone, projectKey, sum } = payment;
        return new CollectionReportRecordModel({
            projectKey: payment.projectId.ordinalNumber
            , programNo: payment.programId.ordinalNumber
            , account: payment.programId.paymentMethod.bankAccount.accountNumber
            , name: payment.customerId.lastName + ' ' + payment.customerId.firstName
            , endDate: payment.programId.endDate
            , sum: payment.sum// (sumShekel + sumDollar * this.dollarRate).toFixed(2)
            , startDate: payment.programId.startDate
            , city: payment.customerId.communication.address.city.name
            , address: payment.customerId.communication.address.street.name
            , telephone: payment.customerId.communication.celular

        });
    }

    async getReportData(filter: any) {
        const payments = await Payment.find(filter)
            .populate('organizationId')
            .populate('projectId')
            .populate('customerId')
            .populate('programId');


        const _payments = payments.map(payment => this._mapRecord(payment));

        return new CollectionReportModel({
            organization: {
                name: this.organization?.name
                , address: this.organization?.address
            }
            , dollarRate: 3.25
            , day: dateFormat(new Date('12-12-1212'), "dd")
            , month: dateFormat(new Date('12-12-2021'), "mmmm yyyy")
            , records: _payments
            , sum: _payments.reduce((sum, record) => sum + parseFloat(record.sum), 0).toFixed(2)
        })

    };


    getReportBytes() {
        console.log(path.basename(__filename));
        return this.getReportData(this.filter)
            .then(data => createHtml(data, path.join('src/resources/collectionReport/template.html')))
            .then(html => createPdf(html, pdfReportConfig()));
    }

}
