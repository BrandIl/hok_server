import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Organization, OrganizationAttrs } from '../models/organization';
import { Program, ProgramAttrs } from '../models/program';

const YYMMDD = () => {
    const date = new Date();
    var yy = date.getFullYear.toString().substring(2, 2);
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
            .concat(organization.masavData.charge.codeNosse)
            .concat("00") //
            .concat(YYMMDD())
            .concat("0")
            .concat("001")
            .concat("0")
            .concat(YYMMDD())
            .concat(organization.masavData.charge.senderCode)
            .concat("000000")
            .concat((organization.name + "--".repeat(30).substring(30)))
            .concat(" ".repeat(56))
            .concat("KOT")
            .concat("\r\n");
        return title;
    }

    static moveRecord(program: ProgramAttrs, organization: OrganizationAttrs) {
        let move = "".concat("1")
            .concat(organization.masavData.charge.codeNosse)
            .concat("00")
            .concat("000000")
            .concat(program.paymentMethod.bankAccount.bankId)
            .concat(program.paymentMethod.bankAccount.branchId)
            .concat("0000")
            .concat(program.paymentMethod.bankAccount.accountNumber + "0".repeat(9).substring(9))
            .concat("315138404")
            .concat("name" + "abc ".repeat(4).substring(16))
            .concat(("0".repeat(13) + program.sum).substring(13))
            .concat("12345678912345678912")
            .concat(program.startDate + program.endDate)
            .concat("000")
            .concat("006")
            .concat("0".repeat(18))
            .concat("  ")
            .concat("\r\n");

        return move;
    }

    static totalRecord(organization: OrganizationAttrs, sumOfMoves: number, sumOfPayments: number) {
        let total = "".concat("5")
            .concat(organization.masavData.charge.codeNosse)
            .concat("00")
            .concat(YYMMDD())
            .concat("0")
            .concat("001")
            .concat("0")
            .concat("0".repeat(15) + sumOfPayments.toString().substring(15))
            .concat("0".repeat(15))
            .concat(sumOfMoves.toString())
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

    static end1Record() {
        let move = "1234567890".repeat(13)
            .concat("\r\n");
        return move;
    }

}

