import mongoose from 'mongoose';
import { Communication } from './interfaces/communication';
import { Organization } from './organization';

interface CustomerAttrs{
  id:string;
  firstName:string;
  lastName: string;
  communication: Communication,
  organizationId: typeof Organization,
}

interface CustomerDoc extends mongoose.Document{
  id:string;
  firstName:string;
  lastName: string;
  communication: Communication,
  organizationId: typeof Organization,
}

interface CustomerModel extends mongoose.Model<any>{
    build(attrs:CustomerAttrs):CustomerDoc;
}

const CustomerSchema = new mongoose.Schema({
    id:{type:String, required:true},
    firstName:{type: String, required:true},
    lastName: {type: String, required:true},
    communication: { type:Object as unknown as Communication ,  required: true },
    organizationId:{type:mongoose.Types.ObjectId, ref:'Organization', required:true},
}
  ,{
    toJSON:{
        transform(doc, ret){
          ret.id=ret._id;
          delete ret._id;
    }
  }
});


CustomerSchema.statics.build=(attrs:CustomerAttrs)=>{
    return new Customer(attrs);
    };

const Customer =mongoose.model<CustomerDoc,CustomerModel>('Customer',CustomerSchema);


export {Customer};