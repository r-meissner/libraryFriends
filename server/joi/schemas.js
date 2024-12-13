import Joi from "joi";

export const userSchema = Joi.object({
    userName: Joi.string().max(20).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).max(50).required(),
    city: Joi.string(),
    country: Joi.string(),
    avatar: Joi.string(),
});

export const updateUserSchema = Joi.object({
    userName: Joi.string().max(20).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).max(50),
    city: Joi.string(),
    country: Joi.string(),
    avatar: Joi.string(),
});

export const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    pages: Joi.number().allow(null),
    publisher: Joi.string().allow(''),
    year: Joi.string().allow(''),
    edition: Joi.string().allow(''),
    description: Joi.string().allow(''),
    cover: Joi.string().allow('')
});

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(50).required()
});

