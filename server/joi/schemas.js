import Joi from "joi";

export const userSchema = Joi.object({
    userName: Joi.string().max(20).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).max(50).required(),
    city: Joi.string(),
    country: Joi.string(),
    avatar: Joi.string(),
});

export const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    pages: Joi.number(),
    publisher: Joi.string(),
    year: Joi.string(),
    edition: Joi.string(),
    description: Joi.string(),
    cover: Joi.string()
});

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(50).required()
});

