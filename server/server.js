const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/ux/toolkit', (req, res) => {
    res.json([
        { id: 1, name: 'Backpack'},
        { id: 2, name: 'Global Components'},
        { id: 3, name: 'A11y'}
    ]);
});

app.get('/api/ux/toolkit/backpack', (req, res) => {
    res.json([
        { id: 1, name: 'Backpack Core'},
        { id: 2, name: 'Backpack Components'}
    ]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));