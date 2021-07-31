import mongoose, { Document, Model, Schema } from 'mongoose';
import { User } from '../types/models.types';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    second_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
interface UserDoc extends Document, User {}

const User: Model<UserDoc> = mongoose.model('User', userSchema);

export default User;
