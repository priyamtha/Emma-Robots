import fs from 'fs';
import csv from 'csv-parser';
import { BabyName } from './models/BabyName';

export async function saveCSVtoDB(filePath: string) {
    const results: { name: string, sex: string }[] = [];

    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            results.push({ name: data.Name, sex: data.Sex });
          })
          .on('end', async () => {
            await BabyName.bulkCreate(results);
            resolve();
          })
          .on('error', reject);
    });
}
 