// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract VotingSystem {
    enum VoteChoice {
        For,
        Against
    }

    struct VotePoll {
        string title;
        string content;
        uint256 nb_for;
        uint256 nb_against;
        address owner;
        bool active;
    }

    mapping(uint256 => address[]) private _authorized;
    mapping(uint256 => mapping(address => VoteChoice)) private _choices;

    VotePoll[] private _votesPolls;

    function createPoll(
        string memory title,
        string memory content,
        address[] memory authorized
    ) public {}

    function getPoll(uint256 _idx) public view returns (VotePoll memory) {
        return _votesPolls[_idx];
    }

    function getPolls() public view returns (VotePoll[] memory) {
        return _votesPolls;
    }

    function votePoll(uint256 _idx, VoteChoice choice) public {}

    function deletePoll(uint256 _idx) public {}
}
