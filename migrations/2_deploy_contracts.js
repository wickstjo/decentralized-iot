const contracts = [
   'Devices',
   'Token',
   'Tasks',
   'Users'
]

module.exports = (deployer) => {
   contracts.forEach(name => {
      deployer.deploy(artifacts.require('./contracts/' + name + '.sol'))
   })
}