import mongoose, { ObjectId } from 'mongoose';
import {PaymentMethod} from './interfaces/paymentMethod';

interface ProgramAttrs{
  sum:number;
  startDate:Date;
  numOfPayments: number;
  launchDay: number,
  paymentMethod: PaymentMethod,
  customerId: ObjectId
}

interface ProgramDoc extends mongoose.Document{
  sum:number;
  startDate:Date;
  numOfPayments: number;
  launchDay: number,
  paymentMethod: PaymentMethod,
  customerId: ObjectId
}

interface ProgramModel extends mongoose.Model<any>{
    build(attrs:ProgramAttrs):ProgramDoc;
}

const ProgramSchema = new mongoose.Schema({
  sum:{type:Number, required:true},
  startDate:{type:Date, required:true},
  numOfPayments:{type:Number, required:true},
  launchDay: {type:Number, required:true},
  paymentMethod:{type:Object as unknown as PaymentMethod, required:true},
  customerId : { type:mongoose.Schema.Types.ObjectId,ref:'Customer', required: true }

}
  ,{
    toJSON:{
        transform(doc, ret){
          ret.id=ret._id;
          delete ret._id;
    }
  }
});


ProgramSchema.statics.build=(attrs:ProgramAttrs)=>{
    return new Program(attrs);
    };

const Program =mongoose.model<ProgramDoc,ProgramModel>('Program',ProgramSchema);


export {Program};