import mongoose from 'mongoose';
import { Password } from '../services/password';
import { Organization } from './organization';

interface UserAttrs{
    name :string;
    email :string;
    password:string;
    isAdmin: boolean;
  //  organizations:[typeof Organization];
}


interface UserDoc extends mongoose.Document{
    name :string;
    email :string;
    password:string;
    isAdmin: boolean;
   // organizations:[typeof Organization]
}

interface UserModel extends mongoose.Model<any>{
    build(attrs:UserAttrs):UserDoc;
}

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    organizations:[{ type: mongoose.Types.ObjectId, ref: 'Organization',  required:true }]
    
},
  {
      toJSON: {
      transform(doc, ret){
          ret.id =ret._id;
          delete ret._id;
          delete ret.__v;
          delete ret.password;
      }
  }
}
);

userSchema.pre('save', async function (done) {
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password',hashed);
    }
    done();

});

userSchema.statics.build=(attrs:UserAttrs)=>{
    console.log(attrs);
    return new User(attrs);
    };

const User =mongoose.model<UserDoc,UserModel>('User',userSchema);


export {User};