// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "contracts/src/VotingSystem.sol";
import "forge-std/Script.sol";

contract VotingSystemDeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        VotingSystem system = new VotingSystem();

        console.log("VotingSystem deployed", address(system));
    }
}
