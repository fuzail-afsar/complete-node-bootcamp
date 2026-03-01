const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  const index = tours.findIndex((el) => el.id === val * 1);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  req.tourIndex = index;
  next();
};

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: {
      tours,
    },
  });
};
exports.createTour = (req, res) => {
  const newTourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newTourId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};
exports.getTour = (req, res) => {
  const tour = tours[req.tourIndex];

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.updateTour = (req, res) => {
  const tour = tours[req.tourIndex];
  const updatedTour = Object.assign(tour, req.body);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    },
  );
};
exports.deleteTour = (req, res) => {
  tours.splice(req.tourIndex, 1);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    },
  );
};
