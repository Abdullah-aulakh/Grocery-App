import joi from 'joi';
import {getUserByEmailService} from '../models/userService.js';

const userSchema = joi.object({
name: joi.string()
  .pattern(/^[a-zA-Z0-9 ]+$/) // allow alphanumeric + spaces
  .min(2)
  .max(30)
  .required()
,
  email: joi.string().email().required().external(async(value, helpers) => {
   try{
    const user = await getUserByEmailService(value);
    
    if(user){
      throw new Error("Dupliacte Email");
    }
   }catch(err){
    throw err;
   }
   return value;
  }), 
});

const userValidator = async(req, res, next) => {
 
    try{
        await userSchema.validateAsync(req.body);
        next();
    }
    catch(err){
        return res.status(400).json({ error: err.message });
    }
  next();
};

export default userValidator;