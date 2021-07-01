import fs from 'fs';

export const readAllBytes = (filePath: string, encoding: any) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, encoding, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
}

export const writeAllBytes = (filePath: string, encoding: any) => {
    return new Promise<void>(function (resolve, reject) {
        fs.writeFile(filePath, encoding, "binary", function (err) {
            err ? reject(err) : resolve();
        });
    });
};