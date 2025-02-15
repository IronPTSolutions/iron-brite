const mongoose = require("mongoose");
const dayjs = require("../config/dayjs.config");
const { isURL } = require('../validators/string.validators');
const { events } = require("./user.model");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [3, "Title needs at least 3 characters"],
      maxLength: [100, "Title characters must be lower than 100"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minLength: [10, "Description needs at least 3 characters"],
      maxLength: [7000, "Description characters must be lower than 7000"],
    },
    startDate: {
      type: Date,
      required: [true, "Starting date is required"],
      validate: {
        validator: function (startDate) {
          return dayjs(startDate).isAfter(dayjs());
        },
        message: function () {
          return "Starting date can not be in the past";
        },
      },
    },
    endDate: {
      type: Date,
      required: [true, "Ending date is required"],
      validate: {
        validator: function (endDate) {
          return dayjs(endDate).isAfter(dayjs(this.startDate));
        },
        message: function () {
          return "Starting date can not be in the past";
        },
      },
    },
    address: {
      type: {
        _id: false,
        city: {
          type: String,
          lowercase: true,
          required: [true, "City is required giving an address"],
        },
        street: {
          type: String,
          required: [true, "Street is required giving an address"],
        },
        location: {
          type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
        }
      },
      required: false
    },
    categories: [String],
    poster: {
      type: String,
      default: 'https://picsum.photos/seed/a07c034d-47f4-4a86-97d6-80f8a57f3960/800/600',
      validate: {
        validator: isURL,
        message: function () {
          return "Invalid poster URL";
        }
      }
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true, // include virtuals when object is converted to JSON
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        ret.id = doc.id;
        if (ret.address) {
          const [lng, lat] = ret.address.location.coordinates;
          ret.address.location = { lat, lng }
        }
        return ret;
      },
    },
  }
);

eventSchema.index({ 'address.location': '2dsphere' });


// Virtual property to get comments from a event. Loading Comment.find({ event: event._id }) automatically
eventSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "event",
  justOne: false,
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
