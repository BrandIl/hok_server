import { Organization } from "../models";
import CollectionReportGenerator from "./CollectionReportGenerator";
import nodemailer from 'nodemailer'


export const getReportFile = async (filter: any, date: any) => {
    return await Organization.findOne({ _id: filter.organizationId }).then(organization => {
        const collectionReportGenerator = new CollectionReportGenerator(organization, filter, date);
        return Promise.all([organization, collectionReportGenerator.getReportBytes()]);
    }).then(([organization, fileContent]) => {
        return { fileName: `${organization?.name} - גביה ${date}.pdf`, content: fileContent }
    });
}

export const postReportFile = async (filter: any, date: any) => {
    const { MAILADDRESS: mailAddress, MAILPASS: mailPassword } = process.env;
    const transporter = nodemailer.createTransport(`smtp://${mailAddress}:${mailPassword}@smtp.gmail.com`);
    const getReportPromise = await getReportFile(filter, date);
    const getOrganizationsPromise = await Organization.findOne({ _id: filter.organizationId })


    return transporter.sendMail({
        from: '"שירותי מחשב" <aa@gmail.com>',
        to: getOrganizationsPromise.communication.concats.email,
        subject: `דוח גביה ליום ${date}`,
        // body: " 'mail content...'",
        attachments: [{   // utf-8 string as an attachment
            filename: getReportPromise.fileName,
            content: getReportPromise.content as Buffer
        }]
    });

}