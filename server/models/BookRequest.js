import { Schema, model } from "mongoose";

const bookRequestSchema = new Schema (
    {
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
        book: {type: Schema.Types.ObjectId, ref: 'Book'},
        requestingUser: {type: Schema.Types.ObjectId, ref: 'User'},
        status: {type: String, enum: ['open', 'closed']}
    },
    {
        timestamps: true,
    },
);

export default model('BookRequest', bookRequestSchema);