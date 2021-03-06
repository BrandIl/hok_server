import mongoose from 'mongoose';
import { Organization } from './organization';
import autoIncrement from 'mongoose-auto-increment';


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
        zip: { type: String, length: 8, validate: /[0-9]/, required: true },
        name: { type: String, required: true },
      },
      street: {
        name: { type: String, required: true },
        number: { type: String, required: true },
      }
    },
    celular: { type: String, required: true },
    email: { type: String, required: true },
    remarks: { type: String },
  },
  organizationId: { type: mongoose.Types.ObjectId, ref: 'Organization', required: true },
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


CustomerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

autoIncrement.initialize(mongoose.connection);
CustomerSchema.plugin(autoIncrement.plugin, {
  model: 'Customer',
  field: 'ordinalNumber',
  startAt: 100000000,
  incrementBy: 1
});

const Customer = mongoose.model<CustomerDoc, CustomerModel>('Customer', CustomerSchema);



export { Customer };