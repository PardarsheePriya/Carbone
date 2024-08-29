const express = require('express');
const carbone = require('carbone');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Define the /render route
app.post('/render', (req, res) => {
    const { template, data } = req.body;

    // Specify the template path
    const templatePath = path.join(__dirname, template);

    // Check if the template file exists
    if (!fs.existsSync(templatePath)) {
        return res.status(404).json({ error: `Template file ${template} not found` });
    }

    // Render the report using Carbone
    carbone.render(templatePath, data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Set the content type based on the output format (e.g., PDF, DOCX)
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(result);
    });
});

// Fallback route for root URL
app.get('/', (req, res) => {
    res.send('Carbone server is running');
});

// Start the server
app.listen(3000, () => {
    console.log('Carbone server running on port 3000');
});
