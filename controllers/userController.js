const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb
const uri = "mongodb+srv://fabio:root@cluster0-5s7o1.mongodb.net/test?retryWrites=true&w=majority"; //uri di connessione
const client = new MongoClient(uri, { useNewUrlParser: true }); //recupero l'istanza del client

module.exports.getUserByEmail = function (req, res) {
    client.connect(err => { //Mi collego al db
        const email = req.params.email; //Leggo il nome utente
        console.log(email);
        if (err) console.log(err.message); //Se c'è qualche errore lo stampo
        else {
            const collection = client.db("sample_mflix").collection("users"); //Mi connetto alla collection users
            collection.find({email:email}).toArray(sendData); //Eseguo una query
        }
    });
 
    sendData = function (err, result) {
        if (err) {
            console.log(err.message); //Se c'è qualche errore lo stampo
        }
        res.send(result);
    }
 }

 module.exports.updateUserBymail = function (req, res) {
    res.send("not implemented");
 }

 module.exports.deleteUserByEmail = function (req, res) {
    res.send("not implemented");
 }

 module.exports.createUser = function (req, res) {
    //Leggo i parametri dal body della richiesta 
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    var newInfo = {name: name, email: email, password: password};
    client.connect(err => { //Mi collego al db
        console.log(newInfo);
        if (err) console.log(err.message); //Se c'è qualche errore lo stampo
        else {
            const collection = client.db("sample_mflix").collection("users"); //Mi connetto alla collection users
            collection.insertOne(newInfo, sendData); //Eseguo una query
        }
    });
 
    sendData = function (err, result) {
        if (err) {
            console.log(err.message); //Se c'è qualche errore lo stampo su console
        }
        res.send(result);
    }
    
 }