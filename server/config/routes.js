const pandas = require('../controller/pandas.js');
module.exports = function (app) {
    app.get('/', (req, res) => {
        pandas.GetAll(req, res);
    });
    app.get('/pandas/new', (req, res) => {
        res.render('newPanda');
    });
    app.get('/pandas/:id', (req, res) => {
        pandas.GetPandaByID(req, res);
    });
    app.post('/pandas', (req, res) => {  //action for the form in newPanda 
        pandas.AddNew(req, res);
    });
    app.get('/pandas/edit/:id', (req, res) => {
        pandas.DisplayEditForm(req, res);
    });
    app.post('/editPanda/:id', (req, res) => {  //action for the form in editPanda 
        pandas.EditPanda(req, res);
    });
    app.post("/pandas/destroy/:id", (req, res) => {
        pandas.DeletePanda(req, res);
    })












}