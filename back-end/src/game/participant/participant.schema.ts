import * as mongoose from 'mongoose';

export const ParticipantSchema = new mongoose.Schema({
  token: String,
  position: {
    x: Number,
    y: Number
  }
});
