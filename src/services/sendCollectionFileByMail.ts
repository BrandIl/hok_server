import { Organization } from "../models";
import { getReportFile } from "./getReportFileService";
import nodemailer from 'nodemailer'
import { collectionFile } from "./collectionFile";
import dateformat from "dateformat";


export const sendCollectionFile = async (date: Date) => {
    const { MAILADDRESS: mailAddress, MAILPASS: mailPassword } = process.env;
    const transporter = nodemailer.createTransport(`smtp://${mailAddress}:${mailPassword}@smtp.gmail.com`);
    const file = await collectionFile(date);
    const filename = new Date().toISOString().substr(0, 10);

    return transporter.sendMail({
        from: '"שירותי מחשב" <aa@gmail.com>',
        to: 'spmormps@gmail.com',
        subject: `קובץ גביה לשידור עבור יום: ${dateformat(date, "dd/mm/yy")}`,
        // body: " 'mail content...'",
        attachments: [{   // utf-8 string as an attachment
            filename: file.fileName,
            content: file.content
        }]
    });

}