import mongoose from 'mongoose';
import { Communication } from './interfaces/communication';
import { Organization } from './organization';

interface CustomerAttrs {
  identity: string;
  firstName: string;
  lastName: string;
  communication: Communication,
  organizationId: typeof Organization,
}

interface CustomerDoc extends mongoose.Document {
  identity: string;
  firstName: string;
  lastName: string;
  communication: Communication,
  organizationId: typeof Organization,
}

interface CustomerModel extends mongoose.Model<any> {
  build(attrs: CustomerAttrs): CustomerDoc;
}

const CustomerSchema = new mongoose.Schema({
  identity: { type: String, required: true, length: 9 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  communication: { type: Object as unknown as Communication, required: false },
  organizationId: { type: mongoose.Types.ObjectId, ref: 'Organization', required: false },
}
  , {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  });


CustomerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>('Customer', CustomerSchema);


export { Customer };