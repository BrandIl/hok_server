import mongoose from 'mongoose';

export interface OrganizationAttrs {
  name: string;
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
  }
  masavData: {
    credit: {
      codeNosse: string;
      senderCode: string;
    }
    charge: {
      codeNosse: string;
      senderCode: string;
    }
  };
  paymentAgreement: {
    minPrice: number;
    feePerUnit: number;
    dayOfCharge: number;
    paymentMethod: {
      bankAccount: {
        bankId: number;
        branchId: number
        accountNumber: string;
      }
    }
  };
}

interface OrganizationDoc extends mongoose.Document {
  name: string;
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
  }
  masavData: {
    credit: {
      codeNosse: string;
      senderCode: string;
    }
    charge: {
      codeNosse: string;
      senderCode: string;
    }
  };

  paymentAgreement: {
    minPrice: number;
    feePerUnit: number;
    dayOfCharge: number;
    paymentMethod: {
      bankAccount: {
        bankId: string;
        branchId: string
        accountNumber: string;
      }
      ;
    }
  };
}
interface OrganizationModel extends mongoose.Model<any> {
  build(attrs: OrganizationAttrs): OrganizationDoc;
}

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
    concats
      : {
      name: { type: String, default: "משה" },
      celular: { type: String, default: "0504149062" },
      email: { type: String, default: "a0504149062@gmail.com" },
      remarks: { type: String, default: "------" },
    },
  },
  masavData: {
    credit: {
      codeNosse: { type: String, length: 8, default: "00010000" },
      senderCode: { type: String, length: 5, default: "00000" }
    },
    charge: {
      codeNosse: { type: String, length: 8, default: "00000000" },
      senderCode: { type: String, length: 5, default: "00000" },
    }
  },

  paymentAgreement: {
    minPrice: { type: Number, default: 20 },
    feePerUnit: { type: Number, default: 20 },
    paymentMethod: {
      bankAccount: {
        bankId: { type: Number, default: "12" },
        branchId: { type: Number, default: "475" },
        accountNumber: { type: String, default: "130863" },
      },
    }
  },


}
  , {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  });


OrganizationSchema.statics.build = (attrs: OrganizationAttrs) => {
  return new Organization(attrs);
};

const Organization = mongoose.model<OrganizationDoc, OrganizationModel>('Organization', OrganizationSchema);


export { Organization };