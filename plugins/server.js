const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/resep', { useNewUrlParser: true, useUnifiedTopology: true });

const resepSchema = new mongoose.Schema({
  judul: String,
  deskripsi: String,
  asal: String,
  kategori: String,
  createdAt: { type: Date, default: Date.now }
});

const Resep = mongoose.model('Resep', resepSchema);

app.post('/api/resep', async (req, res) => {
  try {
    const { judul, deskripsi, asal, kategori } = req.body;
    const resepBaru = new Resep({ judul, deskripsi, asal, kategori });
    await resepBaru.save();
    res.status(201).send(resepBaru);
  } catch (error) {
    res.status(400).send({ error: 'Terjadi kesalahan saat mengunggah resep.' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
