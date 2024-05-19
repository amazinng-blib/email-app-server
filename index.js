const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const db = require('./config/db');
db();

app.use(cors());
app.use(express.json());

// todo: swagger

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger/swagger-options');
const path = require('path');

// Serve Swagger UI at /api-docs endpoint

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(
  express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist'))
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const userRoutes = require('./routes/user-routes');
const mailRoutes = require('./routes/mail-routes');

app.use('/api/v1', userRoutes);
app.use('/api/v1', mailRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening at : ${PORT}`);
});
