import mongoose from 'mongoose';
import { Concat  } from './interfaces/concat';
import { Communication  } from './interfaces/communication';
import { PaymentAgreement  } from './interfaces/paymentAgreement';
import { MasavData  } from './interfaces/masavData';

interface OrganizationAttrs{
  name:string;
  communication : Communication;
  masavData: MasavData;
  concats: [Concat];
  paymentAgreement:PaymentAgreement;
}

interface OrganizationDoc extends mongoose.Document{
  name:string;
  communication : Communication;
  masavData: MasavData;
  concats: [Concat];
  paymentAgreement:PaymentAgreement;
}

interface OrganizationModel extends mongoose.Model<any>{
    build(attrs:OrganizationAttrs):OrganizationDoc;
}

const OrganizationSchema = new mongoose.Schema({
  name: { type:String,  required: true },
  communication : { type:Object as unknown as Communication ,  required: true },
  masavData:  { type:Object as unknown as MasavData ,  required: true },
  concats: [Object as unknown as Concat],
  paymentAgreement: { type:Object as unknown as PaymentAgreement ,  required: true },
}
  ,{
    toJSON:{
        transform(doc, ret){
          ret.id=ret._id;
          delete ret._id;
    }
  }
});


OrganizationSchema.statics.build=(attrs:OrganizationAttrs)=>{
    return new Organization(attrs);
    };

const Organization = mongoose.model<OrganizationDoc,OrganizationModel>('Organization',OrganizationSchema);


export {Organization};