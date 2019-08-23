const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb
const uri = "mongodb+srv://fabio:root@cluster0-5s7o1.mongodb.net/test?retryWrites=true&w=majority"; //uri di connessione

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

/**
 * Gestisce la route movies/list/:num
 */
module.exports.list = function (req, res) {
    let num = parseInt(req.params.num);
    getConnection((err,client) => { //Se è connesso esegue questa callback
        if (err) throw err;
        const collection = client.db("sample_mflix").collection("movies");
        collection.find().limit(num).toArray((err, result) => {sendData(err,result,res, client)});
    });
}

/**
 * Gestisce la route /movie_from_title/:title
 */
module.exports.getMovieFromTitle = function (req, res) {
    let titolo = req.params.title; //Leggo il titolo passato come parametro
    getConnection((err,client) => { //Se è connesso esegue questa callback
        if (err) throw err;
        const collection = client.db("sample_mflix").collection("movies");
        collection.find({'title':`${titolo}`}).toArray((err, result) => {sendData(err,result,res, client)});
    });
}

