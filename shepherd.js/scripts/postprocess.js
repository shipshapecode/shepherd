const fs = require('fs');
const path = require('path');

const declarationFile = path.join(__dirname, '../dist', 'shepherd.d.ts');
let content = fs.readFileSync(declarationFile, 'utf8');
content = content.replace(/export default Shepherd/g, 'export = Shepherd');
fs.writeFileSync(declarationFile, content);
