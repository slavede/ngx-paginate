// rewrites package.json and sets peerDependencies instead of dependencies
const jsonfile = require('jsonfile'),
  path = require('path'),
  packageJsonLocation = path.join(__dirname, '..', 'package.json'),
  packageJson = jsonfile.readFileSync(packageJsonLocation)

packageJson['peerDependencies'] = Object.assign({}, packageJson['dependencies']);

delete packageJson['dependencies'];

jsonfile.writeFileSync(packageJsonLocation, packageJson, {spaces: 4})
