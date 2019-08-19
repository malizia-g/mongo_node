const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb
const uri = "mongodb+srv://fabio:root@cluster0-5s7o1.mongodb.net/test?retryWrites=true&w=majority"; //uri di connessione
const client = new MongoClient(uri, { useNewUrlParser: true }); //recupero l'istanza del client
 
module.exports.getLength_year = function (req, res){
    let num = parseInt(req.params.length);
    let num2 = parseInt(req.params.year);
    console.log(num);
    console.log(num2);
    res.send("ciao");
}

module.exports.list = function (req, res) {
    console.log("bau " + client.isConnected());
    client.connect(err => { //Mi collego al db
        let num = parseInt(req.params.num);
        if (err) console.log(err.message); //Se c'è qualche errore lo stampo
        else {
            const collection = client.db("sample_mflix").collection("movies"); //Mi connetto alla collection movies
            collection.find().limit(num).toArray(sendData); //Eseguo la query e passo una funzione di callback
        }
    });

    sendData =  (err, result) => {
        if (err) {
            console.log(err.message); //Se c'è qualche errore lo stampo
        }
        res.send(result);
    }
}

module.exports.getMovieFromTitle = function (req, res) {
    client.connect(err => { //Mi collego al db
        let titolo = req.params.title; //Leggo il titolo passato come parametro
        if (err) console.log(err.message); //Se c'è qualche errore lo stampo
        else {
            const collection = client.db("sample_mflix").collection("movies"); //Mi connetto alla collection movies
            collection.find({'title':`${titolo}`}).toArray(sendData); //Eseguo la query e passo una funzione di callback
        }
    });

    sendData = function (err, result) {
        if (err) {
            console.log(err.message); //Se c'è qualche errore lo stampo
        }
        res.send(result);
    }
}

