import mongoose, { Document, Schema } from 'mongoose';


export interface Todo extends Document{
    title : string,
    description : string,
    date : Date
}
const todoSchema = new Schema<Todo>({
    title : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true,
        maxlength : 300
    },
    date : {
        type : Date,
        required : true,
    }
}, {timestamps : true});

const TodoModel = (mongoose.models.Todo as mongoose.Model<Todo>) || (mongoose.model('Todo', todoSchema));

export default TodoModel;