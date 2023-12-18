const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

const coursesDetailsList = [
  {
    id: 1,
    name: 'Fundamentals of Credit',
    images: ['https://picsum.photos/300/300'],
    status: 'DRAFT',
    instructors: [
      {
        name: 'Roli Jain',
        image: 'https://picsum.photos/300/300'
      },
    ]
  },
  {
    id: 2,
    name: 'Accounting Fundamentals',
    images: ['https://picsum.photos/300/300'],
    status: 'PUBLISHED',
    instructors: [
      {
        name: 'Roli Jain',
        image: 'https://picsum.photos/300/300'
      },
      {
        name: 'Sebastian Taylor',
        image: 'https://picsum.photos/300/300'
      }
    ]
  },
  {
    id: 3,
    name: 'Lithium',
    images: ['https://picsum.photos/300/300'],
    status: 'PUBLISHED',
    instructors: [
      {
        name: 'Sebastian Taylor',
        image: 'https://picsum.photos/300/300'
      }
    ]
  },
];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/courses', (req, res) => {
  const data = [
      {
        id: 1,
        name: 'Fundamentals of Credit',
        image: 'https://picsum.photos/100/100',
        status: 'DRAFT',
        instructors: [
          {
            name: 'Roli Jain',
            image: 'https://picsum.photos/300/300'
          },
        ]
      },
      {
        id: 2,
        name: 'Accounting Fundamentals',
        image: 'https://picsum.photos/100/100',
        status: 'PUBLISHED',
        instructors: [
          {
            name: 'Roli Jain',
            image: 'https://picsum.photos/300/300'
          },
          {
            name: 'Sebastian Taylor',
            image: 'https://picsum.photos/300/300'
          }
        ]
      },
      {
        id: 3,
        name: 'Lithium',
        image: 'https://picsum.photos/100/100',
        status: 'PUBLISHED',
        instructors: [
          {
            name: 'Sebastian Taylor',
            image: 'https://picsum.photos/300/300'
          }
        ]
      },
    ];
  res.json(data);
});

app.get('/courses/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = coursesDetailsList.find(item => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});
