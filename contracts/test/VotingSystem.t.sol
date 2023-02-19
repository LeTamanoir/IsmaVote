// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "contracts/src/VotingSystem.sol";
import "forge-std/Test.sol";

contract VotingSystemTest is Test {
    VotingSystem private _vot;

    address fred = vm.addr(1);
    address george = vm.addr(2);
    address alicia = vm.addr(3);
    address greg = vm.addr(4);
    address robert = vm.addr(5);
    address albert = vm.addr(6);

    address[] public adr_arr = [fred, george, alicia, greg];

    function setUp() public {
        _vot = new VotingSystem();
    }

    function testCreatePoll() public {
        vm.startPrank(robert);

        _vot.createPoll("Miss Monde", "Elections of the most beautiful arse", adr_arr, uint64(block.timestamp + 1000));

        VotePoll memory _pol = _vot.getPoll(0);

        assertEq(_pol.title, "Miss Monde");
        assertEq(_pol.description, "Elections of the most beautiful arse");
        assertEq(_pol.nb_for, 0);
        assertEq(_pol.nb_against, 0);
        assertEq(_pol.owner, robert);
        assertEq(_pol.startTimestamp, block.timestamp);
        assertEq(_pol.endTimestamp, block.timestamp + 1000);
        assertEq(_pol.isActive, true);

        vm.stopPrank();
    }

    function testCreatePoll_bad_arguments() public {
        vm.startPrank(robert);

        vm.expectRevert();
        _vot.createPoll("", "a", adr_arr, uint64(block.timestamp + 1000));

        vm.expectRevert();
        _vot.createPoll("a", "", adr_arr, uint64(block.timestamp + 1000));

        vm.expectRevert();
        _vot.createPoll("a", "a", adr_arr, uint64(block.timestamp - 1000));

        vm.expectRevert();
        address[] memory temp = new address[](0);
        _vot.createPoll("a", "a", temp, uint64(block.timestamp + 1000));

        vm.stopPrank();
    }

    function testVotePoll_authorized() public {
        vm.startPrank(robert);
        _vot.createPoll("Miss Monde", "Elections of the most beautiful arse", adr_arr, uint64(block.timestamp + 1000));
        vm.stopPrank();

        vm.startPrank(george);
        assertEq(_vot.canVote(0), true);
        _vot.votePoll(0, VoteChoice.For);
        assertEq(_vot.getPoll(0).nb_for, 1);

        vm.expectRevert();
        _vot.votePoll(0, VoteChoice.For);
        vm.stopPrank();

        vm.startPrank(alicia);
        _vot.votePoll(0, VoteChoice.Against);
        assertEq(_vot.getPoll(0).nb_for, 1);
        assertEq(_vot.getPoll(0).nb_against, 1);
        vm.stopPrank();
    }

    function testVotePoll_not_authorized() public {
        vm.startPrank(robert);
        _vot.createPoll("Miss Monde", "Elections of the most beautiful arse", adr_arr, uint64(block.timestamp + 1000));
        vm.stopPrank();

        vm.startPrank(albert);
        assertEq(_vot.canVote(0), false);
        vm.expectRevert();
        _vot.votePoll(0, VoteChoice.For);
        vm.stopPrank();
    }

    function testDeletePoll_owner() public {
        vm.startPrank(robert);
        _vot.createPoll("Miss Monde", "Elections of the most beautiful arse", adr_arr, uint64(block.timestamp + 1000));
        _vot.deletePoll(0);
        vm.expectRevert();
        _vot.getPoll(0);
        vm.stopPrank();
    }

    function testDeletePoll_not_owner() public {
        vm.startPrank(robert);
        _vot.createPoll("Miss Monde", "Elections of the most beautiful arse", adr_arr, uint64(block.timestamp + 1000));
        vm.stopPrank();

        vm.startPrank(albert);
        vm.expectRevert();
        _vot.deletePoll(0);
        vm.stopPrank();
    }

    function testGetPoll_invalid_index() public {
        vm.startPrank(robert);
        _vot.createPoll("Miss Monde", "Elections of the most beautiful arse", adr_arr, uint64(block.timestamp + 1000));
        vm.stopPrank();

        vm.startPrank(albert);
        vm.expectRevert();
        _vot.getPoll(10);
        vm.stopPrank();
    }

    function testGetPolls() public {
        vm.startPrank(robert);
        assertEq(_vot.getPolls().length, 0);
        vm.stopPrank();
    }
}
