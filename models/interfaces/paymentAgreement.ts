import { BankAccount } from "./bankAccount";
import { CreditCard } from "./creditCard";

     interface   PaymentAgreement{ 
        minPrice : number;
        feePerUnit: number;
        dayOfCharge: number;
        paymentMethod: {
          bankAccount: BankAccount;
          creditCard: CreditCard;
        } 
      }

      export {PaymentAgreement};