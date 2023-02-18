// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "contracts/src/VotingSystem.sol";
import "forge-std/Script.sol";

contract VotingSystemDeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        new VotingSystem();

        vm.stopBroadcast();
    }
}
