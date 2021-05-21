import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Organization, OrganizationAttrs } from '../models/organization';
import { Program, ProgramAttrs } from '../models/program';

const scryptAsync = promisify(scrypt);

export class Agreement {

    static titleRecord(organization: OrganizationAttrs) {
        let title = "".concat("K")
            .concat(organization.masavData.charge.codeNosse)
            .concat("00") //
            .concat("120120")
            .concat("0")
            .concat("001")
            .concat("0")
            .concat("120100")
            .concat("12345")
            .concat("000000")
            .concat("organization_name          1")
            .concat("                                                        ")
            .concat("KOT")
            .concat("\n");
        return title;
    }

    static moveRecord(program: ProgramAttrs, codeNosse: string) {
        let move = "".concat("1")
            .concat(codeNosse)
            .concat("00")
            .concat("000000")
            .concat(program.paymentMethod.bankAccount.bankId)
            .concat(program.paymentMethod.bankAccount.branchId)
            .concat("0000")
            .concat(program.paymentMethod.bankAccount.accountNumber)
            .concat("12345")
            .concat("0")
            .concat("program.customerIdentity")
            .concat(program.sum)
            .concat("                                                        ")
            .concat("KOT")
            .concat("\n");
        return move;
    }

    static totalRecord(organization: typeof Organization, sumOfMoves: number) {
        let total = "".concat("5")
            .concat(sumOfMoves.toString())
            .concat("00")
            .concat("120120")
            .concat("0")
            .concat("001")
            .concat("0")
            .concat("120100")
            .concat("12345")
            .concat("000000")
            .concat("organization_name          1")
            .concat("                                                        ")
            .concat("KOT")
            .concat("\n");
        return total;
    }

    static endRecord() {
        let move = "".concat("999999999999999999999999999999999999999999999999999")
            .concat("\n");
        return move;
    }
}