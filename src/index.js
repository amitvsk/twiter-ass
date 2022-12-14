const express=require('express');
const mongoose=require('mongoose');
const route=require('./routes')

const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Handle The CORS 
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


mongoose.connect("mongodb+srv://amitvish:4nai6CZgrFtr5B7R@cluster0.3bgsk.mongodb.net/twiter?retryWrites=true&w=majority", {useNewUrlParser: true})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);

app.all('*', function(req, res) {
    throw new Error("Bad request")
})

app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).send({status : false , error: e.message});
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});