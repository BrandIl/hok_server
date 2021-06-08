import mongoose from 'mongoose';
import { Organization } from './organization';
import { Project } from './project';
import { Customer } from './customer';


export interface ProgramAttrs {
  sum: string;
  startDate: Date;
  endDate: Date;
  numOfPayments: number;
  launchDay: number;
  paymentMethod: {
    bankAccount: {
      bankId: string;
      branchId: string;
      accountNumber: string;
    }
    creditCard: {
      creditNumber: number;
      expiringDate: string;
      cvv2: string;
    }
  },
  organizationId: typeof Organization,
  projectId: typeof Project,
  customerId: typeof Customer
}

interface ProgramDoc extends mongoose.Document {
  sum: string;
  startDate: Date;
  endDate: Date;
  numOfPayments: number;
  launchDay: number;
  paymentMethod: {
    bankAccount: {
      bankId: string;
      branchId: string;
      accountNumber: string;
    },
    creditCard: {
      creditNumber: number;
      expiringDate: string;
      cvv2: string;
    }
  },
  organizationId: typeof Organization,
  projectId: typeof Project,
  customerId: typeof Customer
}

interface ProgramModel extends mongoose.Model<any> {
  build(attrs: ProgramAttrs): ProgramDoc;
}

const ProgramSchema = new mongoose.Schema({
  sum: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numOfPayments: { type: Number, required: true },
  launchDay: { type: Number, required: true },
  paymentMethod: {
    bankAccount: {
      bankId: { type: String, required: true },
      branchId: { type: String, required: true },
      accountNumber: { type: String, required: true },
    },
    creditCard: {
      creditNumber: { type: String, required: true },
      expiringDate: { type: String, required: true },
      cvv2: { type: String, required: true }
    }
  },
  organizationId: { type: mongoose.Types.ObjectId, ref: 'Organization', required: true },
  projectId: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }
}
  , {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  });


ProgramSchema.statics.build = (attrs: ProgramAttrs) => {
  console.log(attrs);
  return new Program(attrs);
};


const Program = mongoose.model<ProgramDoc, ProgramModel>('Program', ProgramSchema);

export { Program };