import express from 'express'
import cors from 'cors'
import Question from './models/question.model.js'
import connectDb from './config/db.js'
import dotenv from 'dotenv'
dotenv.config();

export const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());

connectDb();


app.get('/api/search', async(req, res) => {
    // GET http://localhost:5000/api/search?query=rearrange&type=mcq&page=1&limit=10
    const {query,  page = 1, limit = 10, type} = req.query;

    if(!query){
        return res.status(400).json({error: 'Search input is needed'});
    }

    try {
        console.log('received query:', query);
        const sanitizeQuery = query.trim();
        const skip = (page - 1) * limit;

        const filter = {
            $text: {$search: sanitizeQuery}
        }

        if(type && type !== 'all'){
            filter.type = type;
        }

        const results = await Question.find(filter)
        .skip(skip)
        .limit(parseInt(limit))

        const totalResults = await Question.countDocuments(filter);

        res.json({
            results,
            totalResults,
            totalPages: Math.ceil(totalResults / limit),
            currentPage: parseInt(page),
        });

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