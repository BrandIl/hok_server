import pdf from 'html-pdf'

export const createPdf = (html: any, config: any) => {
    return new Promise(function (resolve, reject) {
        pdf.create(html, config).toBuffer(function (err, res) {
            err ? reject(err) : resolve(res);
        });
    });

}
