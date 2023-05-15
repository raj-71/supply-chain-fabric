#!/usr/bin/env bash

generateArtifacts() {
  printHeadline "Generating basic configs" "U1F913"

  printItalics "Generating crypto material for Orderer" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-orderer.yaml" "peerOrganizations/orderer.supplychain.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating crypto material for farmer" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-farmer.yaml" "peerOrganizations/farmer.supplychain.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating crypto material for seller" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-seller.yaml" "peerOrganizations/seller.supplychain.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating crypto material for consumer" "U1F512"
  certsGenerate "$FABLO_NETWORK_ROOT/fabric-config" "crypto-config-consumer.yaml" "peerOrganizations/consumer.supplychain.com" "$FABLO_NETWORK_ROOT/fabric-config/crypto-config/"

  printItalics "Generating genesis block for group group1" "U1F3E0"
  genesisBlockCreate "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config" "Group1Genesis"

  # Create directory for chaincode packages to avoid permission errors on linux
  mkdir -p "$FABLO_NETWORK_ROOT/fabric-config/chaincode-packages"
}

startNetwork() {
  printHeadline "Starting network" "U1F680"
  (cd "$FABLO_NETWORK_ROOT"/fabric-docker && docker-compose up -d)
  sleep 4
}

generateChannelsArtifacts() {
  printHeadline "Generating config for 'my-channel1'" "U1F913"
  createChannelTx "my-channel1" "$FABLO_NETWORK_ROOT/fabric-config" "MyChannel1" "$FABLO_NETWORK_ROOT/fabric-config/config"
}

installChannels() {
  printHeadline "Creating 'my-channel1' on farmer/peer0" "U1F63B"
  docker exec -i cli.farmer.supplychain.com bash -c "source scripts/channel_fns.sh; createChannelAndJoinTls 'my-channel1' 'farmerMSP' 'peer0.farmer.supplychain.com:7041' 'crypto/users/Admin@farmer.supplychain.com/msp' 'crypto/users/Admin@farmer.supplychain.com/tls' 'crypto-orderer/tlsca.orderer.supplychain.com-cert.pem' 'orderer0.group1.orderer.supplychain.com:7030';"

  printItalics "Joining 'my-channel1' on  seller/peer0" "U1F638"
  docker exec -i cli.seller.supplychain.com bash -c "source scripts/channel_fns.sh; fetchChannelAndJoinTls 'my-channel1' 'sellerMSP' 'peer0.seller.supplychain.com:7061' 'crypto/users/Admin@seller.supplychain.com/msp' 'crypto/users/Admin@seller.supplychain.com/tls' 'crypto-orderer/tlsca.orderer.supplychain.com-cert.pem' 'orderer0.group1.orderer.supplychain.com:7030';"
  printItalics "Joining 'my-channel1' on  consumer/peer0" "U1F638"
  docker exec -i cli.consumer.supplychain.com bash -c "source scripts/channel_fns.sh; fetchChannelAndJoinTls 'my-channel1' 'consumerMSP' 'peer0.consumer.supplychain.com:7081' 'crypto/users/Admin@consumer.supplychain.com/msp' 'crypto/users/Admin@consumer.supplychain.com/tls' 'crypto-orderer/tlsca.orderer.supplychain.com-cert.pem' 'orderer0.group1.orderer.supplychain.com:7030';"
}

installChaincodes() {
  if [ -n "$(ls "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node")" ]; then
    local version="0.0.1"
    printHeadline "Packaging chaincode 'chaincode1'" "U1F60E"
    chaincodeBuild "chaincode1" "node" "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node" "16"
    chaincodePackage "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "chaincode1" "$version" "node" printHeadline "Installing 'chaincode1' for farmer" "U1F60E"
    chaincodeInstall "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
    chaincodeApprove "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
    printHeadline "Installing 'chaincode1' for seller" "U1F60E"
    chaincodeInstall "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
    chaincodeApprove "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
    printHeadline "Installing 'chaincode1' for consumer" "U1F60E"
    chaincodeInstall "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
    chaincodeApprove "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
    printItalics "Committing chaincode 'chaincode1' on channel 'my-channel1' as 'farmer'" "U1F618"
    chaincodeCommit "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" "peer0.farmer.supplychain.com:7041,peer0.seller.supplychain.com:7061,peer0.consumer.supplychain.com:7081" "crypto-peer/peer0.farmer.supplychain.com/tls/ca.crt,crypto-peer/peer0.seller.supplychain.com/tls/ca.crt,crypto-peer/peer0.consumer.supplychain.com/tls/ca.crt" ""
  else
    echo "Warning! Skipping chaincode 'chaincode1' installation. Chaincode directory is empty."
    echo "Looked in dir: '$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node'"
  fi

}

installChaincode() {
  local chaincodeName="$1"
  if [ -z "$chaincodeName" ]; then
    echo "Error: chaincode name is not provided"
    exit 1
  fi

  local version="$2"
  if [ -z "$version" ]; then
    echo "Error: chaincode version is not provided"
    exit 1
  fi

  if [ "$chaincodeName" = "chaincode1" ]; then
    if [ -n "$(ls "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node")" ]; then
      printHeadline "Packaging chaincode 'chaincode1'" "U1F60E"
      chaincodeBuild "chaincode1" "node" "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node" "16"
      chaincodePackage "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "chaincode1" "$version" "node" printHeadline "Installing 'chaincode1' for farmer" "U1F60E"
      chaincodeInstall "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
      chaincodeApprove "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
      printHeadline "Installing 'chaincode1' for seller" "U1F60E"
      chaincodeInstall "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
      chaincodeApprove "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
      printHeadline "Installing 'chaincode1' for consumer" "U1F60E"
      chaincodeInstall "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
      chaincodeApprove "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
      printItalics "Committing chaincode 'chaincode1' on channel 'my-channel1' as 'farmer'" "U1F618"
      chaincodeCommit "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" "peer0.farmer.supplychain.com:7041,peer0.seller.supplychain.com:7061,peer0.consumer.supplychain.com:7081" "crypto-peer/peer0.farmer.supplychain.com/tls/ca.crt,crypto-peer/peer0.seller.supplychain.com/tls/ca.crt,crypto-peer/peer0.consumer.supplychain.com/tls/ca.crt" ""

    else
      echo "Warning! Skipping chaincode 'chaincode1' install. Chaincode directory is empty."
      echo "Looked in dir: '$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node'"
    fi
  fi
}

runDevModeChaincode() {
  local chaincodeName=$1
  if [ -z "$chaincodeName" ]; then
    echo "Error: chaincode name is not provided"
    exit 1
  fi

  if [ "$chaincodeName" = "chaincode1" ]; then
    local version="0.0.1"
    printHeadline "Approving 'chaincode1' for farmer (dev mode)" "U1F60E"
    chaincodeApprove "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "my-channel1" "chaincode1" "0.0.1" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "" ""
    printHeadline "Approving 'chaincode1' for seller (dev mode)" "U1F60E"
    chaincodeApprove "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061" "my-channel1" "chaincode1" "0.0.1" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "" ""
    printHeadline "Approving 'chaincode1' for consumer (dev mode)" "U1F60E"
    chaincodeApprove "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081" "my-channel1" "chaincode1" "0.0.1" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "" ""
    printItalics "Committing chaincode 'chaincode1' on channel 'my-channel1' as 'farmer' (dev mode)" "U1F618"
    chaincodeCommit "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "my-channel1" "chaincode1" "0.0.1" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "" "peer0.farmer.supplychain.com:7041,peer0.seller.supplychain.com:7061,peer0.consumer.supplychain.com:7081" "" ""

  fi
}

upgradeChaincode() {
  local chaincodeName="$1"
  if [ -z "$chaincodeName" ]; then
    echo "Error: chaincode name is not provided"
    exit 1
  fi

  local version="$2"
  if [ -z "$version" ]; then
    echo "Error: chaincode version is not provided"
    exit 1
  fi

  if [ "$chaincodeName" = "chaincode1" ]; then
    if [ -n "$(ls "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node")" ]; then
      printHeadline "Packaging chaincode 'chaincode1'" "U1F60E"
      chaincodeBuild "chaincode1" "node" "$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node" "16"
      chaincodePackage "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "chaincode1" "$version" "node" printHeadline "Installing 'chaincode1' for farmer" "U1F60E"
      chaincodeInstall "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
      chaincodeApprove "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
      printHeadline "Installing 'chaincode1' for seller" "U1F60E"
      chaincodeInstall "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
      chaincodeApprove "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
      printHeadline "Installing 'chaincode1' for consumer" "U1F60E"
      chaincodeInstall "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081" "chaincode1" "$version" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
      chaincodeApprove "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" ""
      printItalics "Committing chaincode 'chaincode1' on channel 'my-channel1' as 'farmer'" "U1F618"
      chaincodeCommit "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041" "my-channel1" "chaincode1" "$version" "orderer0.group1.orderer.supplychain.com:7030" "" "false" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem" "peer0.farmer.supplychain.com:7041,peer0.seller.supplychain.com:7061,peer0.consumer.supplychain.com:7081" "crypto-peer/peer0.farmer.supplychain.com/tls/ca.crt,crypto-peer/peer0.seller.supplychain.com/tls/ca.crt,crypto-peer/peer0.consumer.supplychain.com/tls/ca.crt" ""

    else
      echo "Warning! Skipping chaincode 'chaincode1' upgrade. Chaincode directory is empty."
      echo "Looked in dir: '$CHAINCODES_BASE_DIR/./chaincodes/chaincode-kv-node'"
    fi
  fi
}

notifyOrgsAboutChannels() {
  printHeadline "Creating new channel config blocks" "U1F537"
  createNewChannelUpdateTx "my-channel1" "farmerMSP" "MyChannel1" "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config"
  createNewChannelUpdateTx "my-channel1" "sellerMSP" "MyChannel1" "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config"
  createNewChannelUpdateTx "my-channel1" "consumerMSP" "MyChannel1" "$FABLO_NETWORK_ROOT/fabric-config" "$FABLO_NETWORK_ROOT/fabric-config/config"

  printHeadline "Notyfing orgs about channels" "U1F4E2"
  notifyOrgAboutNewChannelTls "my-channel1" "farmerMSP" "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com" "orderer0.group1.orderer.supplychain.com:7030" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
  notifyOrgAboutNewChannelTls "my-channel1" "sellerMSP" "cli.seller.supplychain.com" "peer0.seller.supplychain.com" "orderer0.group1.orderer.supplychain.com:7030" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"
  notifyOrgAboutNewChannelTls "my-channel1" "consumerMSP" "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com" "orderer0.group1.orderer.supplychain.com:7030" "crypto-orderer/tlsca.orderer.supplychain.com-cert.pem"

  printHeadline "Deleting new channel config blocks" "U1F52A"
  deleteNewChannelUpdateTx "my-channel1" "farmerMSP" "cli.farmer.supplychain.com"
  deleteNewChannelUpdateTx "my-channel1" "sellerMSP" "cli.seller.supplychain.com"
  deleteNewChannelUpdateTx "my-channel1" "consumerMSP" "cli.consumer.supplychain.com"
}

printStartSuccessInfo() {
  printHeadline "Done! Enjoy your fresh network" "U1F984"
}

stopNetwork() {
  printHeadline "Stopping network" "U1F68F"
  (cd "$FABLO_NETWORK_ROOT"/fabric-docker && docker-compose stop)
  sleep 4
}

networkDown() {
  printHeadline "Destroying network" "U1F916"
  (cd "$FABLO_NETWORK_ROOT"/fabric-docker && docker-compose down)

  printf "\nRemoving chaincode containers & images... \U1F5D1 \n"
  for container in $(docker ps -a | grep "dev-peer0.farmer.supplychain.com-chaincode1" | awk '{print $1}'); do
    echo "Removing container $container..."
    docker rm -f "$container" || echo "docker rm of $container failed. Check if all fabric dockers properly was deleted"
  done
  for image in $(docker images "dev-peer0.farmer.supplychain.com-chaincode1*" -q); do
    echo "Removing image $image..."
    docker rmi "$image" || echo "docker rmi of $image failed. Check if all fabric dockers properly was deleted"
  done
  for container in $(docker ps -a | grep "dev-peer0.seller.supplychain.com-chaincode1" | awk '{print $1}'); do
    echo "Removing container $container..."
    docker rm -f "$container" || echo "docker rm of $container failed. Check if all fabric dockers properly was deleted"
  done
  for image in $(docker images "dev-peer0.seller.supplychain.com-chaincode1*" -q); do
    echo "Removing image $image..."
    docker rmi "$image" || echo "docker rmi of $image failed. Check if all fabric dockers properly was deleted"
  done
  for container in $(docker ps -a | grep "dev-peer0.consumer.supplychain.com-chaincode1" | awk '{print $1}'); do
    echo "Removing container $container..."
    docker rm -f "$container" || echo "docker rm of $container failed. Check if all fabric dockers properly was deleted"
  done
  for image in $(docker images "dev-peer0.consumer.supplychain.com-chaincode1*" -q); do
    echo "Removing image $image..."
    docker rmi "$image" || echo "docker rmi of $image failed. Check if all fabric dockers properly was deleted"
  done

  printf "\nRemoving generated configs... \U1F5D1 \n"
  rm -rf "$FABLO_NETWORK_ROOT/fabric-config/config"
  rm -rf "$FABLO_NETWORK_ROOT/fabric-config/crypto-config"
  rm -rf "$FABLO_NETWORK_ROOT/fabric-config/chaincode-packages"

  printHeadline "Done! Network was purged" "U1F5D1"
}
