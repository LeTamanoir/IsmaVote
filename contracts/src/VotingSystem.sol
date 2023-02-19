// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

enum VoteChoice {
    Unset,
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

contract VotingSystem {
    mapping(uint256 => address[]) private _authorized;
    mapping(uint256 => mapping(address => VoteChoice)) private _choices;
    VotePoll[] private _votePolls;

    address owner;

    constructor() {
        owner = address(this);
    }

    modifier IsValidIdx(uint256 _idx) {
        require(_idx < _votePolls.length, "Invalid index");
        _;
    }

    modifier IsActive(uint256 _idx) {
        require(_votePolls[_idx].isActive == true, "Poll is not active");
        _;
    }

    modifier IsPollOwner(uint256 _idx) {
        require(_votePolls[_idx].owner == msg.sender, "You are not the owner of the poll");
        _;
    }

    function isAuthorizedAddress(uint256 _idx) private view returns (bool) {
        address[] memory authedAddress = _authorized[_idx];

        for (uint256 i = 0; i < authedAddress.length; i++) {
            if (msg.sender == authedAddress[i]) {
                return true;
            }
        }
        return false;
    }

    function createPoll(
        string memory title,
        string memory description,
        address[] memory authorized,
        uint256 endTimestamp
    ) public {
        require(bytes(title).length > 0, "Empty title");
        require(bytes(description).length > 0, "Empty description");
        require(endTimestamp > block.timestamp, "Bad endtime");
        require(authorized.length > 0, "Empty voters");

        _authorized[_votePolls.length] = authorized;
        _votePolls.push(
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
    }

    function getPoll(uint256 _idx) public view IsValidIdx(_idx) IsActive(_idx) returns (VotePoll memory) {
        return _votePolls[_idx];
    }

    function getPolls() public view returns (VotePoll[] memory) {
        return _votePolls;
    }

    function votePoll(uint256 _idx, VoteChoice choice) public IsValidIdx(_idx) IsActive(_idx) {
        require(isAuthorizedAddress(_idx), "Invalid Address");
        require(_choices[_idx][msg.sender] == VoteChoice.Unset, "Already voted");

        if (choice == VoteChoice.For) {
            _votePolls[_idx].nb_for++;
        } else if (choice == VoteChoice.Against) {
            _votePolls[_idx].nb_against++;
        }
        _choices[_idx][msg.sender] = choice;
    }

    function deletePoll(uint256 _idx) public IsPollOwner(_idx) IsValidIdx(_idx) {
        _votePolls[_idx].isActive = false;
    }
}
