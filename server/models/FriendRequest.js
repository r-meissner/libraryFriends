import { Schema, model } from "mongoose";

const friendRequestSchema = new Schema (
    {
        targetUser: {type: Schema.Types.ObjectId, ref: 'User'},
        requestingUser: {type: Schema.Types.ObjectId, ref: 'User'},
        status: {type: String, enum: ['pending', 'declined'], default: 'pending'},
    },
    {
        timestamps: true,
    },
);

export default model('FriendRequest', friendRequestSchema);