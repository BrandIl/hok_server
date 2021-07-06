import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Organization, OrganizationAttrs } from '../models/organization';
import { Program, ProgramAttrs } from '../models/program';

const YYMMDD = () => {
    const date = new Date();
    var yy = date.getFullYear() % 100;
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [yy,
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('');
};


export class Agreement {

    static titleRecord(organization: OrganizationAttrs) {
        let title = "".concat("K")
            .concat((organization.masavData.charge.codeNosse + "0".repeat(8)).substring(0, 8))
            .concat("00") //
            .concat(YYMMDD())
            .concat("0")
            .concat("001")
            .concat("0")
            .concat(YYMMDD())
            .concat((organization.masavData.charge.senderCode + "0".repeat(5)).substring(0, 5))
            .concat("000000")
            .concat((organization.name + "--".repeat(30)).substring(0, 30))
            .concat(" ".repeat(56))
            .concat("KOT")
            .concat("\r\n");
        return title;
    }

    static moveRecord(program: ProgramAttrs, organization: OrganizationAttrs) {
        let move = "".concat("1")
            .concat((organization.masavData.charge.codeNosse + "0".repeat(8)).substring(0, 8))
            .concat("00")
            .concat("000000")
            .concat((program.paymentMethod.bankAccount.bankId + "0".repeat(8)).substring(0, 2))
            .concat((program.paymentMethod.bankAccount.branchId + "0".repeat(3)).substring(0, 3))
            .concat("0000")
            .concat((program.paymentMethod.bankAccount.accountNumber + "0".repeat(9)).substring(0, 9))
            .concat("0")
            .concat("315138404")
            .concat(("name" + "abc ".repeat(4)).substring(0, 16))
            .concat(("0".repeat(13) + program.sum).substring(0, 13))
            .concat("12345678912345678912")
            .concat((program.startDate.substring(2, 4)
                + program.startDate.substring(4, 6)
                + program.endDate.substring(2, 4)
                + program.endDate.substring(4, 6)).substring(0, 8))
            .concat("000")
            .concat("006")
            .concat("0".repeat(18))
            .concat("  ")
            .concat("\r\n");

        return move;
    }

    static totalRecord(organization: OrganizationAttrs, sumOfMoves: number, sumOfPayments: number) {
        let total = "".concat("5")
            .concat((organization.masavData.charge.codeNosse + "0".repeat(8)).substring(0, 8))
            .concat("00")
            .concat(YYMMDD())
            .concat("0")
            .concat("001")
            .concat(("0".repeat(15) + sumOfPayments.toString()).substr(-15))
            .concat("0".repeat(15))
            .concat(("0".repeat(15) + sumOfMoves.toString()).substr(-7))
            .concat("0".repeat(7))
            .concat(" ".repeat(63))
            .concat("\r\n");
        return total;
    }

    static endRecord() {
        let move = "".concat("9".repeat(128))
            .concat("\r\n");
        return move;
    }

}

