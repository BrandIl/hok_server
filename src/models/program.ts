import mongoose from 'mongoose';
import { Organization } from './organization';
import { Project } from './project';
import { Customer } from './customer';
import autoIncrement from 'mongoose-auto-increment';
import { transpileModule } from 'typescript';


export interface ProgramAttrs {
  sum: string;
  startDate: string;
  endDate: string;
  numOfPayments: number;
  launchDay: number;
  paymentMethod: {
    bankAccount: {
      bankId: string;
      branchId: string;
      accountNumber: string;
    }
  },
  isActive: boolean,
  organizationId: typeof Organization,
  projectId: typeof Project,
  customerId: typeof Customer
}

interface ProgramDoc extends mongoose.Document {
  sum: string;
  startDate: string;
  endDate: string;
  numOfPayments: number;
  launchDay: number;
  paymentMethod: {
    bankAccount: {
      bankId: string;
      branchId: string;
      accountNumber: string;
    },
  },
  isActive: boolean,
  organizationId: typeof Organization,
  projectId: typeof Project,
  customerId: typeof Customer
}

interface ProgramModel extends mongoose.Model<any> {
  build(attrs: ProgramAttrs): ProgramDoc;
}

const ProgramSchema = new mongoose.Schema({
  sum: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  numOfPayments: { type: Number, required: true },
  launchDay: { type: Number, required: true },
  paymentMethod: {
    bankAccount: {
      bankId: { type: String, required: true },
      branchId: { type: String, required: true },
      accountNumber: { type: String, required: true },
    }
  },
  isActive: { type: Boolean, default: true },
  organizationId: { type: mongoose.Types.ObjectId, ref: 'Organization', required: true },
  projectId: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  ordinalNumber: { type: Number, require: true }
}
  , {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  });



ProgramSchema.statics.build = (attrs: ProgramAttrs) => {
  console.log(attrs);
  return new Program(attrs);
};
ProgramSchema.plugin(autoIncrement.plugin, {
  model: 'Program',
  field: 'ordinalNumber',
  startAt: 300000000,
  incrementBy: 1
});
const Program = mongoose.model<ProgramDoc, ProgramModel>('Program', ProgramSchema);



export { Program };