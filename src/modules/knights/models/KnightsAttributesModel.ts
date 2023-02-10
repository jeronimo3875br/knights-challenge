import { model, Schema } from 'mongoose';

export const knightsAttributesModel = model('KnightsAttributes', new Schema(
	{
		strength: {
			type: Number,
			required: true
		},
		dexterity: {
			type: Number,
			required: true
		},
		constitution: {
			type: Number,
			required: true
		},
		intelligence: {
			type: Number,
			required: true
		},
		wisdom: {
			type: Number,
			required: true
		},
		charisma: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true
	}
));