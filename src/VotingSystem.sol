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
        uint256 startTimestamp;
        uint256 endTimestamp;
        bool isActive;
    }

    mapping(uint256 => address[]) private _authorized;
    mapping(uint256 => mapping(address => VoteChoice)) private _choices;

    VotePoll[] public _votesPolls;
    address owner;

    constructor() public {
        owner = address(this);
    }

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function createPoll(
        string memory title,
        string memory description,
        address[] memory authorized,
        uint256 endTimestamp
    ) public {
        _votesPolls.push(
            VotePoll({
                title: title,
                description: description,
                nb_for: 0,
                nb_against: 0,
                owner: msg.sender,
                startTimestamp: block.timestamp,
                endTimestamp: endTimestamp,
                isActive: true
            })
        );

        _authorized[_votesPolls.length] = authorized;
    }

    function getPoll(uint256 _idx) public view returns (VotePoll memory) {
        return _votesPolls[_idx];
    }

    function getPolls() public view returns (VotePoll[] memory) {
        return _votesPolls;
    }

    function votePoll(uint256 _idx, VoteChoice choice) public {
        if (choice == VoteChoice.For) {
            _votesPolls[_idx].nb_for++;
        } else if (choice == VoteChoice.Against) {
            _votesPolls[_idx].nb_against++;
        }
        _choices[_idx][msg.sender] = choice;
    }

    function deletePoll(uint256 _idx, address only_owner) public OnlyOwner {
        _votesPolls[_idx].isActive = false;
    }
}
