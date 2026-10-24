const express = require('express');
const { greet } = require('./greet');

const app = express();

// Public health check for uptime monitoring.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// A minimal greeting endpoint (optionally ?name=Bea).
app.get('/', (req, res) => {
  res.type('text').send(greet(req.query.name));
});

app.use((req, res) => {
  res.status(404).type('text').send('not found');
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`helloworld listening on :${port}`));
}

module.exports = app;
