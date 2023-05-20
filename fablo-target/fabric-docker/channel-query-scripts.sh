#!/usr/bin/env bash

source "$FABLO_NETWORK_ROOT/fabric-docker/scripts/channel-query-functions.sh"

set -eu

channelQuery() {
  echo "-> Channel query: " + "$@"

  if [ "$#" -eq 1 ]; then
    printChannelsHelp

  elif [ "$1" = "list" ] && [ "$2" = "farmer" ] && [ "$3" = "peer0" ]; then

    peerChannelList "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041"

  elif
    [ "$1" = "list" ] && [ "$2" = "seller" ] && [ "$3" = "peer0" ]
  then

    peerChannelList "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061"

  elif
    [ "$1" = "list" ] && [ "$2" = "consumer" ] && [ "$3" = "peer0" ]
  then

    peerChannelList "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081"

  elif

    [ "$1" = "getinfo" ] && [ "$2" = "my-channel1" ] && [ "$3" = "farmer" ] && [ "$4" = "peer0" ]
  then

    peerChannelGetInfo "my-channel1" "cli.farmer.supplychain.com" "peer0.farmer.supplychain.com:7041"

  elif [ "$1" = "fetch" ] && [ "$2" = "config" ] && [ "$3" = "my-channel1" ] && [ "$4" = "farmer" ] && [ "$5" = "peer0" ]; then
    TARGET_FILE=${6:-"$channel-config.json"}

    peerChannelFetchConfig "my-channel1" "cli.farmer.supplychain.com" "$TARGET_FILE" "peer0.farmer.supplychain.com:7041"

  elif [ "$1" = "fetch" ] && [ "$3" = "my-channel1" ] && [ "$4" = "farmer" ] && [ "$5" = "peer0" ]; then
    BLOCK_NAME=$2
    TARGET_FILE=${6:-"$BLOCK_NAME.block"}

    peerChannelFetchBlock "my-channel1" "cli.farmer.supplychain.com" "${BLOCK_NAME}" "peer0.farmer.supplychain.com:7041" "$TARGET_FILE"

  elif
    [ "$1" = "getinfo" ] && [ "$2" = "my-channel1" ] && [ "$3" = "seller" ] && [ "$4" = "peer0" ]
  then

    peerChannelGetInfo "my-channel1" "cli.seller.supplychain.com" "peer0.seller.supplychain.com:7061"

  elif [ "$1" = "fetch" ] && [ "$2" = "config" ] && [ "$3" = "my-channel1" ] && [ "$4" = "seller" ] && [ "$5" = "peer0" ]; then
    TARGET_FILE=${6:-"$channel-config.json"}

    peerChannelFetchConfig "my-channel1" "cli.seller.supplychain.com" "$TARGET_FILE" "peer0.seller.supplychain.com:7061"

  elif [ "$1" = "fetch" ] && [ "$3" = "my-channel1" ] && [ "$4" = "seller" ] && [ "$5" = "peer0" ]; then
    BLOCK_NAME=$2
    TARGET_FILE=${6:-"$BLOCK_NAME.block"}

    peerChannelFetchBlock "my-channel1" "cli.seller.supplychain.com" "${BLOCK_NAME}" "peer0.seller.supplychain.com:7061" "$TARGET_FILE"

  elif
    [ "$1" = "getinfo" ] && [ "$2" = "my-channel1" ] && [ "$3" = "consumer" ] && [ "$4" = "peer0" ]
  then

    peerChannelGetInfo "my-channel1" "cli.consumer.supplychain.com" "peer0.consumer.supplychain.com:7081"

  elif [ "$1" = "fetch" ] && [ "$2" = "config" ] && [ "$3" = "my-channel1" ] && [ "$4" = "consumer" ] && [ "$5" = "peer0" ]; then
    TARGET_FILE=${6:-"$channel-config.json"}

    peerChannelFetchConfig "my-channel1" "cli.consumer.supplychain.com" "$TARGET_FILE" "peer0.consumer.supplychain.com:7081"

  elif [ "$1" = "fetch" ] && [ "$3" = "my-channel1" ] && [ "$4" = "consumer" ] && [ "$5" = "peer0" ]; then
    BLOCK_NAME=$2
    TARGET_FILE=${6:-"$BLOCK_NAME.block"}

    peerChannelFetchBlock "my-channel1" "cli.consumer.supplychain.com" "${BLOCK_NAME}" "peer0.consumer.supplychain.com:7081" "$TARGET_FILE"

  else

    echo "$@"
    echo "$1, $2, $3, $4, $5, $6, $7, $#"
    printChannelsHelp
  fi

}

printChannelsHelp() {
  echo "Channel management commands:"
  echo ""

  echo "fablo channel list farmer peer0"
  echo -e "\t List channels on 'peer0' of 'farmer'".
  echo ""

  echo "fablo channel list seller peer0"
  echo -e "\t List channels on 'peer0' of 'seller'".
  echo ""

  echo "fablo channel list consumer peer0"
  echo -e "\t List channels on 'peer0' of 'consumer'".
  echo ""

  echo "fablo channel getinfo my-channel1 farmer peer0"
  echo -e "\t Get channel info on 'peer0' of 'farmer'".
  echo ""
  echo "fablo channel fetch config my-channel1 farmer peer0 [file-name.json]"
  echo -e "\t Download latest config block and save it. Uses first peer 'peer0' of 'farmer'".
  echo ""
  echo "fablo channel fetch <newest|oldest|block-number> my-channel1 farmer peer0 [file name]"
  echo -e "\t Fetch a block with given number and save it. Uses first peer 'peer0' of 'farmer'".
  echo ""

  echo "fablo channel getinfo my-channel1 seller peer0"
  echo -e "\t Get channel info on 'peer0' of 'seller'".
  echo ""
  echo "fablo channel fetch config my-channel1 seller peer0 [file-name.json]"
  echo -e "\t Download latest config block and save it. Uses first peer 'peer0' of 'seller'".
  echo ""
  echo "fablo channel fetch <newest|oldest|block-number> my-channel1 seller peer0 [file name]"
  echo -e "\t Fetch a block with given number and save it. Uses first peer 'peer0' of 'seller'".
  echo ""

  echo "fablo channel getinfo my-channel1 consumer peer0"
  echo -e "\t Get channel info on 'peer0' of 'consumer'".
  echo ""
  echo "fablo channel fetch config my-channel1 consumer peer0 [file-name.json]"
  echo -e "\t Download latest config block and save it. Uses first peer 'peer0' of 'consumer'".
  echo ""
  echo "fablo channel fetch <newest|oldest|block-number> my-channel1 consumer peer0 [file name]"
  echo -e "\t Fetch a block with given number and save it. Uses first peer 'peer0' of 'consumer'".
  echo ""

}
