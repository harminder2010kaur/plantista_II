const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || '8080';
const route = require('./server/route/route');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('assets'));
app.use(cors());

app.use('/plants', route);
app.listen(port, () => {
    console.log(`Application listen at port ${port}`);
});