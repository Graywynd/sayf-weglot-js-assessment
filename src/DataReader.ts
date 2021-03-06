const fs = require('fs');

export default (path : string) : string[] => {
  return fs.readFileSync(path).toString().split('\n').map(line => line.trim());
}