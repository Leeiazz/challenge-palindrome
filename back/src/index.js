import cors from 'cors';
import express, { json } from 'express';
import { verifyPalindrome } from './helpers/verify-palindrome.js';

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

const registers = [];

app.get('/historical', async (req, res) => {
  try {
    res.send({ registers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ registers: [], message: error.message });
  }
});

app.post('/verify-palindrome', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.length === 0)
      return res.status(400).send({ message: 'Text is required' });

    if (verifyPalindrome(text)) {
      registers.push({ text, isPalindrome: true, date: new Date() });
      res.send({
        isPalindrome: true,
        registers,
        message: `SI es palindromo: ${text}`,
      });
    } else {
      registers.push({ text, isPalindrome: false, date: new Date() });
      res.send({
        isPalindrome: false,
        registers,
        message: `NO es palindromo: ${text}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ registers: [], message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
