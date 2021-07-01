import express, { Request, Response } from 'express';
import { currentUser, requireAuth } from '../../middlewares';
import { Payment, Project } from '../../models';
import PDFDocument from 'pdfkit';
import html2pdf from 'html-pdf';
import PdfPrinter from 'pdfmake';
import fs from 'fs';
import { Model } from 'mongoose';

let fonts = {
    Roboto: {
        normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
        bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
        italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
        bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
    },
    // Roboto: {
    //     normal: 'node_modules/pdfmake/examples/fonts/ahronbd.ttf',
    //     bold: 'node_modules/pdfmake/examples/fonts/ahronbd.ttf',
    //     italics: 'node_modules/pdfmake/examples/fonts/ahronbd.ttf',
    //     bolditalics: 'node_modules/pdfmake/examples/fonts/ahronbd.ttf',
    // }
};
const printer = new PdfPrinter(fonts);
const router = express.Router();


function buildTableBody(data: any[], columns: any[]) {
    var body = [];

    body.push(columns);

    data.forEach(function (row) {
        var dataRow: any[] = [];

        columns.forEach(function (column) {
            dataRow.push(row[column]?.toString() || "");
        })

        body.push(dataRow);
    });

    return body;
}
0
function table(data: any[], columns: any[]) {
    return {
        table: {
            headerRows: 1,
            body: buildTableBody(data, columns)
        }
    };
}



router.get('/api/pdf',
    //currentUser,
    // requireAuth,
    async (req: Request, res: Response) => {

        let { sort, filter } = req.query;
        sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
        filter = filter == undefined ? {} : JSON.parse(req.query.filter as string);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reports.pdf');

        const payments = await Payment.find(filter as Object)
            .populate('organizationId')
            .populate('projectId')
            .populate('customerId')
            .populate('programId')
            .sort(sort as object);
        if (!payments.length) {
            return res.status(404).end();
        }
        var documentDefinition = {
            content: [
                { text: 'Dynamic parts', style: 'header' },
                // table(payments, [Object.keys(payments[0]._doc)])
                table(payments, ['id', 'projectId.name'])

            ]
        }
        debugger;
        var pdfDoc = printer.createPdfKitDocument(documentDefinition);
        pdfDoc.end();
        pdfDoc.pipe(res);




        // pdfDoc.getBase64((data) => {
        //     res.writeHead(200,
        //         {
        //             'Content-Type': 'application/pdf',
        //             'Content-Disposition': 'attachment;filename="filename.pdf"'
        //         });

        //     const download = Buffer.from(data.toString('utf-8'), 'base64');
        //     res.end(download);
        // });
    });

export { router as getFormAsPDFByIdRouter };
