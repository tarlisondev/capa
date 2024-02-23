const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors());

app.get('/', async (_, res) => {

  const files = await searchFile();
  res.status(200).json(files);

})

async function searchFile() {
  const { GoogleAuth } = require('google-auth-library');
  const { google } = require('googleapis');

  const auth = new GoogleAuth({
    scopes: process.env.SCOPE,
    keyFile: './key.json'
  });
  const service = google.drive({ version: 'v3', auth });
  const files = [];
  try {
    const res = await service.files.list({
      q: 'mimeType=\'image/jpeg\'',
      fields: 'nextPageToken, files(id, name)',
      spaces: 'drive',
      pageSize: 300
    });
    Array.prototype.push.apply(files, res.files);
    res.data.files.forEach(function (file) {
    });
    return res.data.files;
  } catch (err) {
    throw err;
  }
}

app.listen(process.env.PORT)
