const Joi = require("joi");

const validatecourseCateogy = (data)=>{
    const schema = Joi.object({
        CourseName:Joi.string().required(),
        // CourseImage:Joi.string().required(),
    });

    return schema.validate(data);
}


const validatecourse_Product = (data)=>{
    const schema = Joi.object({
        name:Joi.string().required(),
        CourseId:Joi.string().required(),
    });

    return schema.validate(data);
}

const validateCourse_Id = (data)=>{
    const schema = Joi.object({
        CourseId:Joi.string().required(),
    });

    return schema.validate(data);
}

const validateCourseDetail = (data)=>{
    const schema = Joi.object({
        category:Joi.string().required(),
        name:Joi.string().required(),
        validity:Joi.string().required(),
        price:Joi.string().required(),
        discount:Joi.string().required(),
        title:Joi.string().required(),
        description:Joi.string().required()
    });

    return schema.validate(data);
}



module.exports ={validatecourseCateogy,validatecourse_Product,validateCourse_Id,validateCourseDetail}