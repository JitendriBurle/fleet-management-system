require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(require('./middlewares/logger.middleware'));
app.use('/users', require('./routes/user.routes'));
app.use('/vehicles', require('./routes/vehicle.routes'));
app.use('/trips', require('./routes/trip.routes'));
app.use('./analytics', require('./routes/analytics.routes'));

app.use(require('./middlewares/notFound.middleware'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});