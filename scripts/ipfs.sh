sudo ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
sudo ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin  '["http://localhost:3000"]'

sudo ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
sudo ipfs daemon