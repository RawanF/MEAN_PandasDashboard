const express = require("express");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PandaDashboard', { useNewUrlParser: true });

const PandaSchema = new mongoose.Schema({
    name:  { type: String, required: true},
    food: { type: String, required: true},
    gender: { type: String, required: true },
    age: { type: Number, min: 0, max: 150 ,required: true},
}, {timestamps: true });


const Panda = mongoose.model('Panda', PandaSchema);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {  
    Panda.find()
        .then(data => res.render("index", {pandas: data}))
        .catch(err => res.json(err));
});
app.get('/pandas/new', (req, res) => {  
    res.render('newPanda');
});
app.get('/pandas/:id', (req, res) => {  
    Panda.findById(req.params.id)
        .then(data => res.render("DisplayPanda", {panda: data}))
        .catch(err => res.json(err));
});

app.post('/pandas', (req, res) => {  //action for the form in newPanda 
    const panda = new Panda();
    panda.name = req.body.name;
    panda.food=req.body.food;
    panda.gender=req.body.gender;
    panda.age = Number(req.body.age);
    panda.save()// inserts the data into the database then returns a promise
        .then(newPandaData => console.log('panda created: ', newPandaData))//will execute upon successfully inserting data in the database
        .catch(err => console.log(err));//will execute if there is an error
    res.redirect('/');
});
app.get('/pandas/edit/:id', (req, res) => {  
    Panda.findById(req.params.id)
        .then(data => res.render("editPanda", {panda: data}))
        .catch(err => res.json(err));
});
app.post('/pandas/:id', (req, res) => {  //action for the form in editPanda 
    var query={'_id':req.params.id};
        panda.findByIdAndUpdate(query, { $set: { name:req.body.name,food:req.body.food,gender:req.body.gender,age: Number(req.body.age) }},{new: false}).save()
        .then(newPandaData => console.log('panda updated: ', newPandaData))//will execute upon successfully updating data in the database
        .catch(err => console.log(err));//will execute if there is an error
    res.redirect('/pandas/:id');
    });
    
app.post("/pandas/destroy/:id", (req, res) => {
    Panda.findByIdAndRemove(req.params.id)
    .then(console.log('Panda Deleted'))//will execute upon successfully delete data from the database
    .catch(err => console.log(err));//will execute if there is an error
res.redirect('/');
})

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000")); 