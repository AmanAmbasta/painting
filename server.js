const express = require('express');
var Datastore = require('nedb');
const app = express();
const port = 3000;

const db = new Datastore({ filename:'db/data.db' });
db.loadDatabase();
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello World!');
    db.insert({name:'aman', anamil: ['mana', 12] });

});
app.post('/api',(req, res) =>{
    // reading information recives from Client as the body-parse
    console.log(req.body);
    
    db.insert(req.body);
   
    
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));