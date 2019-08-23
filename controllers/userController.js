const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb
const uri = "mongodb+srv://fabio:root@cluster0-5s7o1.mongodb.net/test?retryWrites=true&w=majority"; //uri di connessione
//const client = new MongoClient(uri, { useNewUrlParser: true }); //recupero l'istanza del client
/**
* La funzione si connette al DB
* @callbackQuery: E' la funzione di callback che sarà ritornata dopo la connessione al DB
*/
function getConnection(callbackQuery) { 
    MongoClient.connect(uri, { useNewUrlParser: true }, (err,client)=>{
        if (err) return callbackQuery(err);//Se c'è un errore nella connessione ritorno solo il parametro err
        callbackQuery(null, client); //Se riesco a connettermi non ritorno nessun errore e la collection
    })
 }  
 
 /**
 * Invia i dati in formato JSON al client
 */
 function sendData(err,result,response, client){
    if (err) console.log(err.message); //Se c'è qualche errore lo stampo (dovrei spedire anche un codice di errore)
    else response.send(result); //Altrimenti ritorno i dati
    client.close();
 }


module.exports.getUserByEmail = function (req, res) {
    const email = req.params.email; //Leggo il nome utente
    getConnection((err,client) => { //Se è connesso esegue questa callback
        if (err) throw err;
        const collection = client.db("sample_mflix").collection("movies");
        collection.find({email:email}).toArray((err, result) => {sendData(err,result,res, client)});
    });
 }

 module.exports.updateUserBymail = function (req, res) {
    const searchEmail = req.params.email; //Leggo email utente
    const rb = req.body;
    var newUser = {$set:{name: rb.name, email: rb.email, password: rb.password}};
    getConnection((err,client) => { //Se è connesso esegue questa callback
        if (err) throw err;
        const collection = client.db("sample_mflix").collection("movies");
        collection.updateOne({email:searchEmail},newUser,(err, result) => {sendData(err,result,res, client)});
    });
 }
 
 module.exports.deleteUserByEmail = function (req, res) {
    const email = req.params.email; //Leggo email utente
    getConnection((err,client) => { //Se è connesso esegue questa callback
        if (err) throw err;
        const collection = client.db("sample_mflix").collection("movies");
        collection.deleteOne({email:email}, (err, result) => {sendData(err,result,res, client)});
    });
 }

 module.exports.createUser = function (req, res) {
    const rb = req.body;
    var newUser = {name: rb.name, email: rb.email, password: rb.password};
    getConnection((err,client) => { //Se è connesso esegue questa callback
        if (err) throw err;
        const collection = client.db("sample_mflix").collection("movies");
        collection.insertOne(newUser, (err, result) => {sendData(err,result,res, client)});
    });
 }

 