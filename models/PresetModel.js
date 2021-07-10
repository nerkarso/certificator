import { model, models, Schema } from 'mongoose';

const schema = new Schema({
  title: { type: String, required: true },
  details: {
    receiverName: { type: String },
    paragraph: { type: String },
    dateAwarded: { type: String },
    signature1: { type: String },
    signature2: { type: String },
  },
  settings: {
    designId: { type: String },
    receiverFontSize: { type: Number },
    receiverFontFamily: { type: String },
    receiverFontColor: { type: String },
    paragraphMaxWidth: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export default models.Preset || model('Preset', schema);
