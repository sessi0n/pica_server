let file_names = [];
file_names[1001] = 'match';
file_names[1201] = 'load_battle';

for (let key in file_names) {
    exports[key.toString()] = require('./packet/' + file_names[key]);
}