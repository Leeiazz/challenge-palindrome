import cors from 'cors';
import express, { json } from 'express';

const app = express();
app.use(cors());
app.use(json());

/**
 * Routes for the challenge
 */

// GET /
app.get('/ping', async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  res.send({ message: 'pong' });
});
app.get('/historical', async (req, res) => {
  try {
    const registers = [];
    for (let i = 0; i < 5; i++) {
      registers.push({
        text: `text ${i}`,
        isPalindrome: true,
        date: new Date().toISOString(),
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    res.send({ registers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ registers: [], message: error.message });
  }
});

app.post('/verify-palindrome', async (req, res) => {
  const { body } = req;
  res.send({ message: `Palindromo: ${body}` });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
