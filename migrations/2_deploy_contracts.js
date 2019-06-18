const contracts = [
   'Devices',
   'Licences',
   'Tasks',
   'Users'
]

module.exports = (deployer) => {
   contracts.forEach(name => {
      deployer.deploy(artifacts.require('./contracts/' + name + '.sol'))
   })
}