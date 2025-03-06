import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

// ----------------------------------- Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'ejs');

// ----------------------------------- Database



// ----------------------------------- Routes
app.get('/home', (req, res) => {
    res.send('Server ready')
})

// ----------------------------------- Port
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})