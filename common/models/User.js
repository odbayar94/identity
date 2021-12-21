const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 64,
      minlength: 2,
      required: false,
    },
    lastName: {
      type: String,
      maxlength: 64,
      minlength: 2,
      required: false,
    },
    email: {
      type: String,
      maxlength: 64,
      minlength: 6,
      required: false,
      unique: true,
    },
    avatar: {
      type: String,
      maxlength: 255,
      minlength: 6,
      required: false,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

let User;
try {
  User = mongoose.model("User");
} catch (e) {
  User = mongoose.model("User", UserSchema);
}

export { User };
