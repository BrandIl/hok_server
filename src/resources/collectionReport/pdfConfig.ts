import dateFormat from "dateformat"

export const pdfReportConfig = () => {
    return {
        "directory": "/tmp",
        "height": "10.5in",
        "width": "8in",
        "format": "A4",
        "orientation": "portrait",
        "border": {
            "top": "0in",
            "right": "0in",
            "bottom": "0.5in",
            "left": "0in"
        },
        "paginationOffset": 1,
        "header": {
            "height": "20mm",
            "contents": `<div class='pager'> עמוד <span>{{page}}</span> מתוך <span>{{pages}} </span></div><br/>
                    <div class='pager'> ת.הפקה ${dateFormat(new Date(), 'dd.mm.yy HH:MM:ss')} </div>`
        }
    }
}
