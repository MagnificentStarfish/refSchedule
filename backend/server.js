var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/refSchedule', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () { return console.log('Connected to MongoDB'); })
    .catch(function (err) { return console.error('Could not connect to MongoDB', err); });
