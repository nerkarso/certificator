import { model, models, Schema } from 'mongoose';

const schema = new Schema({
  title: { type: String },
  contents: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.Design || model('Design', schema);
