const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
