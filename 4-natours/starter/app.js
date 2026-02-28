const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newTourId = tours[tours.length - 1].id;
  const newTour = Object.assign({ id: newTourId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    },
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port} ...`);
});
