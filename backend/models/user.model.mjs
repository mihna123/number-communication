import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.isPassValid = async (pass) => {
    const user = this;
    const result = await bcrypt.compare(pass, user.password);
    return result;
};

export const UserModel = mongoose.model('users', UserSchema);
