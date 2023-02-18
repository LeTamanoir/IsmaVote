// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

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

contract VotingSystem {
    mapping(uint256 => address[]) private _authorized;
    mapping(uint256 => mapping(address => VoteChoice)) private _choices;
    VotePoll[] private _votesPolls;

    address owner;

    constructor() {
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
        require(bytes(title).length != 0, "Wrong EndTime inputted");
        require(bytes(description).length != 0, "Wrong EndTime inputted");
        require(endTimestamp > block.timestamp, "Wrong EndTime inputted");

        _authorized[_votesPolls.length] = authorized;

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
    }

    function getPoll(uint256 _idx) private view returns (VotePoll memory) {
        return _votesPolls[_idx];
    }

    function getPolls() private view returns (VotePoll[] memory) {
        return _votesPolls;
    }

    function isAuthorizedAddress(uint256 _idx) public view returns (bool) {
        address[] memory authorizedAddresses = _authorized[_idx];

        for (uint i = 0; i < authorizedAddresses.length; i++) {
            if (msg.sender == authorizedAddresses[i]) {
                return true;
            }
        }
        return false;
    }

    function votePoll(uint256 _idx, VoteChoice choice) public {
        require(isAuthorizedAddress(_idx), "Invalid Address");
        
        if (choice == VoteChoice.For) {
            _votesPolls[_idx].nb_for++;
        } else if (choice == VoteChoice.Against) {
            _votesPolls[_idx].nb_against++;
        }
        _choices[_idx][msg.sender] = choice;
    }

    function deletePoll(uint256 _idx) public OnlyOwner {
        _votesPolls[_idx].isActive = false;
    }
}
