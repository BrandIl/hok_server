import schedule from 'node-schedule';
import { collection } from './collection';
import dateformat from 'dateformat';


export const AutomaticCollection = () => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.tz = 'Etc/UTC';
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    dateformat(date_ob, "mm/yy")

    const job = schedule.scheduleJob(rule, () => {
        collection(new Date());
        console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + 'Automatic collection performed successfully');
    });
}
