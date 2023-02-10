import { model, Schema } from 'mongoose';

export const knightsWaponModel = model('KnightsWeapons', new Schema(
	{
		name: {
			type: String,
			required: true
		},
		mod: {
			type: Number,
			required: true
		},
		attr: {
			type: String,
			required: true
		},
		equipped: {
			type: Boolean,
			required: true
		}
	},
	{
		timestamps: true
	}
));