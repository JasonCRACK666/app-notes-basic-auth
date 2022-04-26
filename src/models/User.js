const { model, Schema } = require('mongoose')

const userSchema = new Schema(
	{
		avatar: {
			type: String,
			required: true,
			default:
				'https://www.ecured.cu/images/thumb/a/a1/Ejemplo_de_Avatar.png/260px-Ejemplo_de_Avatar.png',
		},
		name: { type: String, required: true, trim: true },
		lastname: { type: String, required: true, trim: true },
		notes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Note',
			},
		],
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, unique: true },
	},
	{
		versionKey: false,
	}
)

module.exports = model('User', userSchema)
