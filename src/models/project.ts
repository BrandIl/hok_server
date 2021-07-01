import mongoose from 'mongoose';
import { Organization } from './organization';
import autoIncrement from 'mongoose-auto-increment';


interface ProjectAttrs {
  name: string;
  organizationId: typeof Organization;
}

interface ProjectDoc extends mongoose.Document {
  name: string;
  organizationId: typeof Organization;
}

interface ProjectModel extends mongoose.Model<any> {
  build(attrs: ProjectAttrs): ProjectDoc;
}

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
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


ProjectSchema.statics.build = (attrs: ProjectAttrs) => {
  return new Project(attrs);
};
ProjectSchema.plugin(autoIncrement.plugin, {
  model: 'Project',
  field: 'ordinalNumber',
  startAt: 200,
  incrementBy: 1
});


const Project = mongoose.model<ProjectDoc, ProjectModel>('Project', ProjectSchema);


export { Project };