import  express from 'express';
const app = express();
import axios from 'axios';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({extended:true}));
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dashboard', async (req,res)=>{
    try {
        // let query = 'Avengers';
        let query = req.query.search;
        const {data} = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=9360c2228d5ce0814583d0dce0b60b0f&query='+query)
        // const result = JSON.parse(data)
        console.log(data)
        res.render('dashboard',{data:data,searchResult:query})
    } catch (error) {
        console.log(error)
        return error;
    }
})
app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.render('search');
})




app.listen(5000, ()=> {
    console.log('Movie Server started at port 5000.');
})