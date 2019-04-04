// rewrites package.json and sets dependencies instead of peerDependencies
const jsonfile = require('jsonfile'),
  path = require('path'),
  packageJsonLocation = path.join(__dirname, '..', 'package.json'),
  packageJson = jsonfile.readFileSync(packageJsonLocation)

packageJson['dependencies'] = Object.assign({}, packageJson['peerDependencies']);

delete packageJson['peerDependencies'];

jsonfile.writeFileSync(packageJsonLocation, packageJson, {spaces: 4})
