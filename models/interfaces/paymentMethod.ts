import { BankAccount } from "./bankAccount";
import { CreditCard } from "./creditCard";

    
           interface  PaymentMethod {
            bankAccount: BankAccount;
            creditCard: CreditCard;
          } 

  export {PaymentMethod};
    
    
