import { models } from '../config/constants'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  keepCount: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  imgUrl: { type: String, required: true },
  linkUrl: { type: String, required: true },
  public: { type: Boolean, default: true },
  created: { type: Number, default: Date.now() },
  creatorId: {type: ObjectId, ref: models.user.name, required: true},
  vaults: [{ type: ObjectId, ref: models.vault.name }]
});

module.exports = mongoose.model(models.keep.name, schema);