const { model, Schema } = require('mongoose')

const nodeSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		content: { type: String, required: true },
		important: { type: Boolean, required: true, default: false },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = model('Note', nodeSchema)
