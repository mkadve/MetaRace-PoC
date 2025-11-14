// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public immutable owner;
    Candidate[] private candidates;
    mapping(address => bool) public hasVoted;

    event CandidateAdded(uint256 indexed candidateIndex, string name);
    event Voted(address indexed voter, uint256 indexed candidateIndex);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier validCandidate(uint256 candidateIndex) {
        require(candidateIndex < candidates.length, "Candidate does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory name) external onlyOwner {
        require(bytes(name).length > 0, "Candidate name required");
        candidates.push(Candidate({name: name, voteCount: 0}));
        emit CandidateAdded(candidates.length - 1, name);
    }

    function vote(uint256 candidateIndex)
        external
        validCandidate(candidateIndex)
    {
        require(!hasVoted[msg.sender], "Address has already voted");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;

        emit Voted(msg.sender, candidateIndex);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinner() external view returns (string memory name) {
        require(candidates.length > 0, "No candidates registered");

        uint256 winningIndex = 0;
        uint256 highestVotes = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > highestVotes) {
                highestVotes = candidates[i].voteCount;
                winningIndex = i;
            }
        }

        return candidates[winningIndex].name;
    }
}

