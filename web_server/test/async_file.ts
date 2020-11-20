
import fs from 'fs';

export function read_file(full_path_file: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(full_path_file, 'utf8', function(err, file) {
      if (err)
        return reject(err);

      if (file) {
        resolve(file);
      }
      else {
        reject('no read file plain');
      }
    });
  });
}

export function read_file_async(full_path_file: string) {
  return fs.readFileSync(full_path_file, 'utf8');
}

export function exist_file(full_path_file: string) {
  return fs.existsSync(full_path_file);
}

export function write_file(full_path_file: string, plain_text: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(full_path_file, plain_text,  function(err) {
      if (err) {
        return reject(err.message);
      }

      return resolve();
    });
  })
}
