const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let processing = false;
const userData = [
  {
    email: 'jim@gmail.com',
    number: 221122,
  },
  {
    email: 'jam@gmail.com',
    number: 830347,
  },
  {
    email: 'john@gmail.com',
    number: 221122,
  },
  {
    email: 'jams@gmail.com',
    number: 349425,
  },
  {
    email: 'jams@gmail.com',
    number: 141424,
  },
  {
    email: 'jill@gmail.com',
    number: 822287,
  },
  {
    email: 'jill@gmail.com',
    number: 822286,
  },
];
app.post('/search', async (req, res) => {
  if (processing) {
    res.status(400).json({
      error:
        'Предыдущий запрос все еще обрабатывается. Попробуйте еще раз позже.',
    });
    return;
  }

  processing = true;

  setTimeout(() => {
    const { email, number } = req.body;
    const formatedNumber = number.replace(/[^\d]/g, '');
    const user = userData.find(
      (u) => u.email === email && u.number === formatedNumber
    );

    processing = false;
    res.json(user);
  }, 5000);
});

app.listen(port, () => {
  console.log(`Сервак летит где-то тут: http://localhost:${port}`);
});
