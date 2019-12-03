const app = require('./server/server.js');
const mongoose = require('mongoose');

let port = 3000;

// connect db
mongoose.connect("mongodb+srv://user:password1234@whatsinmyfridge-7whlg.mongodb.net/test?retryWrites=true&w=majority", 
{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('DB Connected!')
).catch(err => {console.log(`DB Connection Error: ${err.message}`);});

app.listen(port);