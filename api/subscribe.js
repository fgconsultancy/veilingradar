export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Ongeldig e-mailadres' });
  }

  const API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = parseInt(process.env.BREVO_LIST_ID);

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    // Stuur exacte Brevo response terug voor debugging
    if (response.status === 201 || response.status === 204) {
      return res.status(200).json({ success: true });
    } else if (data.code === 'duplicate_parameter') {
      return res.status(200).json({ success: true, already: true });
    } else {
      return res.status(400).json({ 
        error: data.message || 'Inschrijving mislukt',
        brevo_code: data.code,
        brevo_status: response.status
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
