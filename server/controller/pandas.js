const mongoose = require('mongoose');
const Panda = mongoose.model('Panda');
module.exports = {

    GetAll: function (req, res) {
        Panda.find()
            .then(data => res.render("index", { pandas: data }))
            .catch(err => res.json(err));
    },
    AddNew: function (req, res) {
        const panda = new Panda();
        panda.name = req.body.name;
        panda.food = req.body.food;
        panda.gender = req.body.gender;
        panda.age = Number(req.body.age);
        panda.save()// inserts the data into the database then returns a promise
            .then(newPandaData => console.log('panda created: ', newPandaData))//will execute upon successfully inserting data in the database
            .catch(err => console.log(err));//will execute if there is an error
        res.redirect('/');
    },

    GetPandaByID: function (req, res) {
        Panda.findById(req.params.id)
            .then(data => res.render("DisplayPanda", { panda: data }))
            .catch(err => res.json(err));
    },
    DisplayEditForm: function (req, res) {
        Panda.findById(req.params.id)
            .then(data => res.render("editPanda", { panda: data }))
            .catch(err => res.json(err));
    },
    EditPanda: function (req, res) {
        var query = { '_id': req.params.id };
        Panda.findOneAndUpdate({ query }, { name: req.body.name, food: req.body.food, gender: req.body.gender, age: Number(req.body.age) })
            .then(PandaUpdated => console.log('panda updated: ', PandaUpdated))//will execute upon successfully updating data in the database
            .catch(err => console.log(err));//will execute if there is an error
        res.redirect('/pandas/' + req.params.id);
    },
    DeletePanda: function (req, res) {
        Panda.findByIdAndRemove(req.params.id)
            .then(console.log('Panda Deleted'))//will execute upon successfully delete data from the database
            .catch(err => console.log(err));//will execute if there is an error
        res.redirect('/');

    },

}