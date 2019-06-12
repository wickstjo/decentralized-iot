const contracts = [
   'Devices',
   'Licences',
   'Tasks',
   'Token',
   'Users'
]

module.exports = (deployer) => {
   contracts.forEach(name => {
      deployer.deploy(artifacts.require('./contracts/' + name + '.sol'))
   })
}