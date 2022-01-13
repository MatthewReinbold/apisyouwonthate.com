const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// name of the table we use in Airtable for contact form
const CONTACT_FORM_TABLE_NAME = 'contact-form';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  // great, handle the message
  const { body } = req;

  const {
    'contact-name': Name,
    'contact-info': Contact,
    comment: Message,
    'bot-field': honeypot,
  } = body;

  if (honeypot) {
    res.status(400).send({ message: 'No bots allowed 🤖' });
    return;
  }

  try {
    const result = await base(CONTACT_FORM_TABLE_NAME).create(
      {
        Name,
        Contact,
        Message,
        Status: 'Todo',
      },
      { typecast: true }
    );
    res.status(200).send({ message: 'Message sent. Thank you!' });
  } catch (err) {
    res.status(500).send({ err, message: 'Something went wrong' });
  }
}
