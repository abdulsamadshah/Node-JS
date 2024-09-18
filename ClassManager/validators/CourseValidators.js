const Joi = require("joi");

const validatecourseCateogy = (data)=>{
    const schema = Joi.object({
        CourseName:Joi.string().required(),
        // CourseImage:Joi.string().required(),
    });

    return schema.validate(data);
}


module.exports ={validatecourseCateogy}