import express from 'express'
import cors from 'cors'
import mongoose, {Schema, model} from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected successfully to mongodb');

    } catch (error) {
        console.error('Mongodb connection error => ', error);
    }
}
connectDb();

const questionSchema = new Schema({
    type: {type: String, required: true},
    title: {type: String, required: true},
    solution: {type: String, required: true},
    options: {type: Array},
    blocks: {type: Array},
}, {timestamps: true})

// IMP -> indexing : text -> index
questionSchema.index({title : 'text'});
const Question = model('Question', questionSchema);

app.get('/api/search', async(req, res) => {
    // GET http://localhost:5000/api/search?query=JavaScript
    const {query} = req.query;

    if(!query){
        return res.status(400).json({error: 'Search input is needed'});
    }

    try {
        console.log('received query:', query);
        const sanitizeQuery = query.trim();

        // $search -> operator in text index
        const result = await Question.find({
            $text: {$search: sanitizeQuery}
        });
        res.json(result);

    } catch (error) {
        res.status(500).json({error: 'database error'})
    }

})

app.get('/all-questions', async(req, res) => {
    const result = await Question.find();
    res.json(result);
})

app.get('/', (req, res) => {
    res.send('page working properly || speakxxx');
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})