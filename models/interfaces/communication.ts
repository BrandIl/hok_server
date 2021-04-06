interface Address {
      city:{
        zip:string;
        name:string;
      }
      street:{
        name:string;
        number:string;
      }
    }
     
interface Communication{
    address:Address;
    phone: string;
    email: string;
     }
export {Communication};