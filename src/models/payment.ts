import mongoose from 'mongoose';
import { Organization } from './organization';
import autoIncrement from 'mongoose-auto-increment';
import { Project, Customer } from '.';
import { Program } from './program';

export const StatusEnum = Object.freeze({ "OK": "OK", "Failed": "Failed" });

interface PaymentAttrs {
    sum: string;
    collectionDate: Date;
    paymentMethod: {
        bankAccount: {
            bankId: string;
            branchId: string;
            accountNumber: string;
        }
    },
    status: string,
    organizationId: typeof Organization,
    projectId: typeof Project,
    customerId: typeof Customer
    programId: typeof Program
}

interface PaymentDoc extends mongoose.Document {
    sum: string;
    collectionDate: Date;
    paymentMethod: {
        bankAccount: {
            bankId: string;
            branchId: string;
            accountNumber: string;
        }
    },
    status: string,
    organizationId: typeof Organization,
    projectId: typeof Project,
    customerId: typeof Customer,
    programId: typeof Program
}

interface PaymentModel extends mongoose.Model<any> {
    build(attrs: PaymentAttrs): PaymentDoc;
}

const PaymentSchema = new mongoose.Schema({
    sum: { type: String, required: true },
    collectionDate: { type: Date, required: true },
    paymentMethod: {
        bankAccount: {
            bankId: { type: String, required: true, length: 2 },
            branchId: { type: String, required: true, length: 3 },
            accountNumber: { type: String, required: true, length: 6 },
        }
    },
    status: { type: String, enum: StatusEnum, required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true }

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