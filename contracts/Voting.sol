// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {

    struct Candidate {
        uint id;           
        string name;
        string party;        
        uint voteCount;    
        bool exists;       
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidatesCount;
    address public owner;

    event CandidateAdded(uint indexed id, string name, string party);
    event CandidateRemoved(uint indexed id);
    event VoteCasted(uint indexed candidateId, address voter);

    // restrict access to only the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory _name, string memory _party) public onlyOwner {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        require(bytes(_party).length > 0, "Candidate party cannot be empty");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, 0, true);
        emit CandidateAdded(candidatesCount, _name, _party);
    }

    function removeCandidate(uint _id) public onlyOwner {
        require(candidates[_id].exists, "Candidate does not exist");
        delete candidates[_id]; 
        emit CandidateRemoved(_id);
    }

    function vote(uint _id) public {
        require(candidates[_id].exists, "Candidate does not exist");
        require(!hasVoted[msg.sender], "You have already voted!"); 

        candidates[_id].voteCount++;
        hasVoted[msg.sender] = true; 
        emit VoteCasted(_id, msg.sender);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        uint activeCount = 0;

        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].exists) {
                activeCount++;
            }
        }

        Candidate[] memory candidateList = new Candidate[](activeCount);
        uint index = 0;
        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].exists) {
                candidateList[index] = candidates[i];
                index++;
            }
        }

        return candidateList;
    }

}
