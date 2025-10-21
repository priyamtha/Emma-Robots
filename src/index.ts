import { sequelize } from './db';
import { downloadKaggleCSV } from './kaggle';
import { saveCSVtoDB } from './saveCSVtoDB';
import { sendToHubspot } from './hubspot';

(async () => {
  try {
    //  Connect to DB
    await sequelize.authenticate();
    console.log('DB connected');

    //  Download CSV from Kaggle (sync)
    const csvPath = downloadKaggleCSV(); // no await needed
    console.log('CSV downloaded at', csvPath);

    //  Save CSV to MySQL
    await saveCSVtoDB(csvPath);
    console.log('CSV saved to DB');

    //  Send data to HubSpot
    await sendToHubspot();
    console.log('Data sent to HubSpot');

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    try {
      await sequelize.close();
      console.log('DB connection closed');
    } catch (closeErr) {
      console.error('Error closing DB:', closeErr);
    }
  }
})();
