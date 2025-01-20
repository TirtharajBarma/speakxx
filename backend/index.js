import express from 'express'
import cors from 'cors'
import mongoose, {Schema, model} from 'mongoose'

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());

const connectDb = async() => {
    try {
        await mongoose.connect('mongodb+srv://tirtharajbarma:tirtharaj3@cluster0.nf0kx.mongodb.net/store?retryWrites=true&w=majority&appName=Cluster0')
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

const Question = model('Question', questionSchema);

app.get('/api/search', async(req, res) => {
    // GET http://localhost:5000/api/search?query=JavaScript
    const {query} = req.query;

    if(!query){
        return res.status(400).json({error: 'Search input is needed'});
    }

    try {
        console.log('Received query:', query);
        const sanitizeQuery = query.trim();

        const result = await Question.find({title: new RegExp(sanitizeQuery, 'i')});
        res.json(result);

    } catch (error) {
        res.status(500).json({error: 'database error'})
    }

})

app.get('/', (req, res) => {
    res.send('page working properly || speakxxx');
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})