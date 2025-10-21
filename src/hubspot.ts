import axios from 'axios';
import { BabyName } from './models/BabyName';
import dotenv from 'dotenv';
dotenv.config();


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sendToHubspot() {
  const contacts = await BabyName.findAll();

  for (const contact of contacts) {
    if (!contact.name) continue;

    try {
      await axios.post(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        {
          properties: {
            firstname: contact.name,
            gender: contact.sex,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`Sent contact: ${contact.name}`);
    } catch (error: any) {
      console.error(`Failed for ${contact.name}:`, error.response?.data || error.message);
    }

    await sleep(100); 
  }
}
