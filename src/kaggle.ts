import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export function downloadKaggleCSV() {
    const downloadPath = path.join(__dirname, '../babyNamesUSYOB-full.csv');
    const dir = path.dirname(downloadPath);

    
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    try {
        
        execSync(
            `kaggle datasets download thedevastator/us-baby-names-by-year-of-birth -f babyNamesUSYOB-full.csv -p "${dir}" --unzip`,
            { stdio: 'inherit', shell: 'cmd.exe' }
        );

        console.log('CSV downloaded at:', downloadPath);
        return downloadPath;
    } catch (err) {
        console.error('Failed to download CSV:', err);
        throw err;
    }
}
