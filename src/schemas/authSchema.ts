import joi from "joi";

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  confirmPassword: joi.any().valid(joi.ref("password")).required().messages({
    "any.only": "'passwordConfirmation' has to match 'password'",
  }),
});
