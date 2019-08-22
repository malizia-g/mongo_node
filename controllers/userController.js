const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb
const uri = "mongodb+srv://fabio:root@cluster0-5s7o1.mongodb.net/test?retryWrites=true&w=majority"; //uri di connessione
const client = new MongoClient(uri, { useNewUrlParser: true }); //recupero l'istanza del client
/**
* La funzione si connette al DB
* @callbackQuery: E' la funzione di callback che sarà ritornata dopo la connessione al DB
*/
function getConnection(callbackQuery) { 
    client.connect(err=>{
        if (err) return callbackQuery(err);//Se c'è un errore nella connessione ritorno solo il parametro err
        const collection = client.db("sample_mflix").collection("movies");
        callbackQuery(null, collection); //Se riesco a connettermi non ritorno nessun errore e la collection
    })
 }  
 
 /**
 * Invia i dati in formato JSON al client
 */
 function sendData(err,result,res){
    if (err) console.log(err.message); //Se c'è qualche errore lo stampo (dovrei spedire anche un codice di errore)
    else res.send(result); //Altrimenti ritorno i dati
 }


module.exports.getUserByEmail = function (req, res) {
    const email = req.params.email; //Leggo il nome utente
    getConnection((err,collection) => { //Se è connesso esegue questa callback
        if (err) console.log(err.message);
        collection.find({email:email}).toArray((err, result) => {sendData(err,result,res)});
    });
 }

 module.exports.updateUserBymail = function (req, res) {
    const searchEmail = req.params.email; //Leggo email utente
    const rb = req.body;
    var newUser = {$set:{name: rb.name, email: rb.email, password: rb.password}};
    getConnection((err,collection) => { //Se è connesso esegue questa callback
        if (err) console.log(err.message);
        collection.updateOne({email:searchEmail},newUser,{sendData(err,result,res)});
    });
 }
 
 module.exports.deleteUserByEmail = function (req, res) {
    const email = req.params.email; //Leggo email utente
    getConnection((err,collection) => { //Se è connesso esegue questa callback
        if (err) console.log(err.message);
        collection.deleteOne({email:email}, {sendData(err,result,res)});
    });
 }

 module.exports.createUser = function (req, res) {
    const rb = req.body;
    var newUser = {$set:{name: rb.name, email: rb.email, password: rb.password}};
    getConnection((err,collection) => { //Se è connesso esegue questa callback
        if (err) console.log(err.message);
        collection.insertOne(newUser,{sendData(err,result,res)});
    });
 }

 