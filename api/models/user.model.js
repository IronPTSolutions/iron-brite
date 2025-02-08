const mongoose = require("mongoose");
const { isURL } = require('../validators/string.validators');
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase());

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      maxLength: [30, "User name characters must be lower than 30"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "User email is required"],
      match: [EMAIL_PATTERN, "Invalid user email pattern"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      match: [PASSWORD_PATTERN, "Invalid user password pattern"],
    },
    active: {
      type: Boolean,
      default: false,
    },
    activateToken: {
      type: String,
      default: function () {
        return (
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        );
      },
    },
    avatar: {
      type: String,
      default: function () {
        return `https://i.pravatar.cc/350?u=${this.email}`;
      },
      validate: {
        validator: isURL,
        message: function () {
          return "Invalid avatar URL";
        },
      },
    },
    role: {
      type: String,
      enum: ['admin', 'guess'],
      default: 'guess'
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        delete ret.activateToken;

        ret.id = doc.id;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {

  if (ADMIN_EMAILS.includes(this.email)) {
    this.role = 'admin';
  }

  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, SALT_WORK_FACTOR)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
