#/bin/bash

source .env
forge script contracts/script/deploy.sol \
    --rpc-url ${GOERLI_RPC_URL} \
    --private-key ${PRIVATE_KEY} \
    --broadcast
