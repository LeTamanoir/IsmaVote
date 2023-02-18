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

        // address[] memory authed = new address[](2);
        // authed[0] = address(tx.origin);

        // system.createPoll("Hello", "dire bonjour en anglais", authed, 12112211221);

        // VotePoll memory poll_ = system.getPoll(0);

        // console.log("poll_.title", poll_.title);

        console.log("VotingSystem deployed", address(system));
    }
}
