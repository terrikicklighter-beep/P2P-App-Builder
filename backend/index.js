// Tiny Express connector that reads a published Google Sheet CSV and returns JSON rows.
//
// Use by publishing your sheet to the web (File -> Publish to web) and copying the CSV link:
// Example CSV URL: https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=0
//
// Endpoint: GET /api/sheets?csvUrl=<url-encoded-csv-url>

const express = require('express');
const axios = require('axios');
const { parse } = require('csv-parse/sync');

const app = express();
app.use(express.json());

app.get('/api/sheets', async (req, res) => {
  const csvUrl = req.query.csvUrl;
  if (!csvUrl) return res.status(400).json({ error: 'csvUrl query param required' });

  try {
    const resp = await axios.get(decodeURIComponent(csvUrl));
    const csvText = resp.data;
    // parse CSV to records (first row = header)
    const records = parse(csvText, { columns: true, skip_empty_lines: true });
    res.json({ rows: records });
  } catch (err) {
    console.error(err?.message || err);
    res.status(500).json({ error: 'failed to fetch/parse sheet', details: err?.message || String(err) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Sheets connector running on http://localhost:${port}`));
