import { model, Schema } from 'mongoose';

export const knightsModel = model('Knights', new Schema(
	{
		image: String,
		name: {
			type: String,
			required: true
		},
		nickname: {
			type: String,
			required: true
		},
		birthday: {
			type: String,
			required: true
		},
		keyAttribute: {
			type: String,
			default: 'strength'
		},
		attributes: {
			type: Schema.Types.ObjectId,
			ref: 'KnightsAttributes',
			required: true
		},
		weapons: [{
			type: Schema.Types.ObjectId,
			ref: 'KnightsWeapons',
			required: true
		}],
		isHero: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
));