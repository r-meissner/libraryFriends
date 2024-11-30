import mongoose, { Schema, model } from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    userName: { type: String, required: [true, 'Firstname is required'], unique: true },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'], select: false },
    city: {type: String},
    country: {type: String},
    avatar: {type : String},
    friends: [
        {_id: {type: Schema.Types.ObjectId, ref: 'User'}}
    ],
    books: [
        {
            _id: {type: Schema.Types.ObjectId, ref: 'Book'},
            owner: {type: Schema.Types.ObjectId, ref: 'User'},
            currentReader: {type: Schema.Types.ObjectId, ref: 'User'},
            borrowedDate: {type: Date},
            returnDate: {type: Date},
        }
    ]
  },
  {
    timestamps: true,
  },
);

export default model('User', userSchema);