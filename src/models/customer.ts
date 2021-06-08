import mongoose from 'mongoose';
import { Organization } from './organization';

interface CustomerAttrs {
  identity: string;
  firstName: string;
  lastName: string;
  communication: {
    address: {
      city: {
        zip: string;
        name: string;
      },
      street: {
        name: string;
        number: string;
      }
    },
    concats: {
      name: string;
      celular: string;
      email: string;
      remarks: string;
    };
  };
  organizationId: typeof Organization,
}

interface CustomerDoc extends mongoose.Document {
  identity: string;
  firstName: string;
  lastName: string;
  communication: {
    address: {
      city: {
        zip: string;
        name: string;
      },
      street: {
        name: string;
        number: string;
      }
    },
    concats: {
      name: string;
      celular: string;
      email: string;
      remarks: string;
    };
  };
  organizationId: typeof Organization,
}

interface CustomerModel extends mongoose.Model<any> {
  build(attrs: CustomerAttrs): CustomerDoc;
}

const CustomerSchema = new mongoose.Schema({
  identity: { type: String, required: true, length: 9 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  communication: {
    address: {
      city: {
        zip: { type: String, length: 7, validate: /[0-9]/, default: "4081805" },
        name: { type: String, default: "אלעד" },
      },
      street: {
        name: { type: String, length: 8, default: "התור" },
        number: { type: String, length: 8, default: "9" },
      }
    },
    concat
      : {
      name: { type: String, default: "משה" },
      celular: { type: String, default: "0504149062" },
      email: { type: String, default: "a0504149062@gmail.com" },
      remarks: { type: String, default: "------" },
    },
  },
  organizationId: { type: mongoose.Types.ObjectId, ref: 'Organization', required: true },
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