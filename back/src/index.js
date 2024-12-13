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
  res.send({ message: 'pong' });
});

// Variable local para los registros historicos, la idea sería siempre mantenerlo
// en una base de datos, pero para el challenge lo vamos a mantener en memoria
const registers = [];

const getRegisters = () => {
  return registers.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

app.get('/historical', async (req, res) => {
  try {
    res.send({ registers: getRegisters() });
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
        registers: getRegisters(),
        message: `La ${
          text.includes(' ') ? 'frase' : 'palabra'
        } "${text}" es palíndromo`,
      });
    } else {
      registers.push({ text, isPalindrome: false, date: new Date() });
      res.send({
        isPalindrome: false,
        registers: getRegisters(),
        message: `La ${
          text.includes(' ') ? 'frase' : 'palabra'
        } "${text}" no es palíndromo`,
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
