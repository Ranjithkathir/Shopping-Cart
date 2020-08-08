const express = require('express');
const path = require('path');

let app = express();

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(4000, () => console.log('Running'))