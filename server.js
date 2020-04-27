const express = require('express');
var Datastore = require('nedb');
const app = express();
const port = process.env.PORT || 3000;

const db = new Datastore({ filename:'db/data.db' });
db.loadDatabase();
app.use(express.json({limit : '3mb'}));
app.use(express.static('public'));

app.post('/api',(req, res) =>{
    // reading information recives from Client as the body-parse
    // console.log(req.body);
    
    db.insert(req.body);
   
    
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));