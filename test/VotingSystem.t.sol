// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "src/VotingSystem.sol";
import "forge-std/Test.sol";

contract VotingSystemTest is Test {
    VotingSystem public vot;

    address fred = vm.addr(1);
    address george = vm.addr(2);
    address alicia = vm.addr(3);
    address greg = vm.addr(4);
    address robert = vm.addr(5);

    address[] public adr_arr = [fred, george, alicia, greg];

    function setUp() public {
        vot = new VotingSystem();
    }

    function testCreateVoting() public {

        vm.startPrank(robert);

        vot.createPoll(
            "Miss Monde",
            "Elections of the most beautiful arse",
            adr_arr,
            uint64(block.timestamp + 1000));

        assertEq(vot.getPoll(0).title, "Miss Monde");
        assertEq(vot.getPoll(0).description, "Elections of the most beautiful arse");
        assertEq(vot.getPoll(0).nb_for, 0);
        assertEq(vot.getPoll(0).nb_against, 0);
        assertEq(vot.getPoll(0).owner, msg.sender);
        assertEq(vot.getPoll(0).startTimestamp, block.timestamp);
        assertEq(vot.getPoll(0).endTimestamp, block.timestamp + 1000);
        assertEq(vot.getPoll(0).isActive, true);

        vm.stopPrank();
    }
}
