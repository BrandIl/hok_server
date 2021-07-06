import dateformat from 'dateformat';
import { Agreement } from '.';
import { Organization, Program } from '../models';


export const collectionFile = async (launchDate: Date) => {
    const filename = launchDate.toISOString().substr(0, 10);

    let file = "";
    const organizations = await Organization.find({});

    for (const organization of organizations) {
        file = file.concat(Agreement.titleRecord(organization));
        const programs = await Program.find({
            organizationId: organization.id,
            launchDay: launchDate.getDate(),
            startDate: {
                $lte: dateformat(launchDate, "yyyy/mm")
            },
            endDate: {
                $gte: dateformat(launchDate, "yyyy/mm")
            },
            isActive: true
        });

        let sumOfMoves = 0, sumOfPayments = 0;
        for (const program of programs) {
            file = file.concat(Agreement.moveRecord(program, organization));
            sumOfMoves++;
            sumOfPayments += program.sum;
        }
        file = file.concat(Agreement.totalRecord(organization, sumOfMoves, sumOfPayments));
    }
    file = file.concat(Agreement.endRecord());
    return { fileName: `קובץ גביה ${dateformat(launchDate, "dd/mm/yy")}.txt`, content: Buffer.from(file, 'utf8') }
};