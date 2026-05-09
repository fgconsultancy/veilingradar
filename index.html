export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Ongeldig e-mailadres' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER = process.env.MAILCHIMP_SERVER;

  const url = `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['wachtlijst'],
      }),
    });

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      return res.status(200).json({ success: true });
    } else if (data.title === 'Member Exists') {
      return res.status(200).json({ success: true, already: true });
    } else {
      return res.status(400).json({ error: data.detail || 'Inschrijving mislukt' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Serverfout' });
  }
}
