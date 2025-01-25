import mongoose, {Schema} from "mongoose";

const questionSchema = new Schema({
    type: {type: String, required: true},
    title: {type: String, required: true},
    solution: {type: String, required: true},
    options: {type: Array},
    blocks: {type: Array},
}, {timestamps: true})

// IMP -> indexing : text -> index
questionSchema.index({title : 'text', type: 1});
const Question = mongoose.model('Question', questionSchema);

export default Question