const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrls: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const moment = require("moment-timezone");
userSchema.pre("save", function (next) {
  const now = moment().tz("Asia/Yangon").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

userSchema.pre("update", function (next) {
  const now = moment().tz("Asia/Yangon").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.updatedAt = now;
  next();
});

const postModel = model("Post", postSchema);

module.exports = postModel;
