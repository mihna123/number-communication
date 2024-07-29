const mongoose = require("mongoose");
const { Schema } = require("mongoose");

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

const UserModel = mongoose.model('users', UserSchema);
module.exports = {
    UserModel,
}
