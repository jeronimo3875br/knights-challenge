import { Joi } from 'celebrate';

export const knightSchema = Joi.object().keys({
	image: Joi.string(),
	name: Joi.string().required(),
	nickname: Joi.string().required(),
	birthday: Joi.string().required(),
	weapons: Joi.array().items({
		attr: Joi.string(),
		name: Joi.string().required(),
		mod: Joi.number().required(),
		equipped: Joi.boolean().required()
	}).required(),
	attributes: Joi.object().keys({
		wisdom: Joi.number().required(),
		strength: Joi.number().required(),
		charisma: Joi.number().required(),
		dexterity: Joi.number().required(),
		constitution: Joi.number().required(),
		intelligence: Joi.number().required()
	}).required()
});

export const findKnightById = Joi.object().keys({
	id: Joi.string().required()
});

export const findKnightByFilter = Joi.object().keys({
	filter: Joi.string()
});

export const updateKnightById =  Joi.object().keys({
	image: Joi.string(),
	name: Joi.string(),
	nickname: Joi.string(),
	birthday: Joi.string(),
	weapons: Joi.array().items({
		attr: Joi.string(),
		name: Joi.string(),
		mod: Joi.number(),
		equipped: Joi.boolean()
	}),
	attributes: Joi.object().keys({
		wisdom: Joi.number(),
		strength: Joi.number(),
		charisma: Joi.number(),
		dexterity: Joi.number(),
		constitution: Joi.number(),
		intelligence: Joi.number()
	})
});