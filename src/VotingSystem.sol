// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract VotingSystem {
    enum VoteChoice {
        For,
        Against
    }

    struct VotePoll {
        string title;
        string description;
        uint256 nb_for;
        uint256 nb_against;
        address owner;
        uint256 starttimestamp;
        uint256 endtimestamp;
        bool active;
    }

    mapping(uint256 => address[]) private _authorized;
    mapping(uint256 => mapping(address => VoteChoice)) private _choices;

    VotePoll[] private _votesPolls;

    function createPoll(
        string memory title,
        string memory description,
        address[] memory authorized
    ) public {}

    function getPoll(uint256 _idx) public view returns (VotePoll memory) {
        return _votesPolls[_idx];
    }

    function getPolls() public view returns (VotePoll[] memory) {
        return _votesPolls;
    }

    function votePoll(uint256 _idx, VoteChoice choice) public {
        
        if (choice == VoteChoice.For) {
            _votesPolls[_idx].nb_for++;
        } else if (choice ==VoteChoice.Against) {
            _votesPolls[_idx].nb_against++;
        }
        _choices[_idx][msg.sender] = choice;
    }

    function deletePoll(uint256 _idx) public {
        _votesPolls[_idx].active = false;
    }
}
