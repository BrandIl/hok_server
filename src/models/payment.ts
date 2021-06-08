import mongoose from 'mongoose';
import { Organization } from './organization';
import autoIncrement from 'mongoose-auto-increment';


interface PaymentAttrs {
    name: string;
    organizationId: typeof Organization;
}

interface PaymentDoc extends mongoose.Document {
    name: string;
    organizationId: typeof Organization;
}

interface PaymentModel extends mongoose.Model<any> {
    build(attrs: PaymentAttrs): PaymentDoc;
}

const PaymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }
}
    , {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    });


PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', PaymentSchema);


export { Payment };