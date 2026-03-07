const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

const PORT = process.env.PORT || 3333;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
