import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "party",
        "type": "string"
      }
    ],
    "name": "CandidateAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "CandidateRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "VoteCasted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_party",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "party",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "candidatesCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllCandidates",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "party",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "internalType": "struct Voting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "removeCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Function to get Ethereum provider
const getEthereumProvider = (): ethers.BrowserProvider | null => {
    if (typeof window !== "undefined" && window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        console.error("MetaMask is not installed");
        return null;
    }
};

// Function to connect wallet
export const connectWallet = async (): Promise<string | null> => {
    try {
        const provider = getEthereumProvider();
        if (!provider) return null;

        const accounts: string[] = await provider.send("eth_requestAccounts", []);
        return accounts[0] || null; 
    } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
    }
};

// Function to get contract instance
const getContract = async (): Promise<ethers.Contract | null> => {
    const provider = getEthereumProvider();
    if (!provider) return null;

    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
};

// Function to add a candidate (only owner)
export const addCandidate = async (name: string, party : string): Promise<void> => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const tx: ethers.ContractTransactionResponse = await contract.addCandidate(name, party);
        await tx.wait();
        console.log("Candidate added:", name);
    } catch (error) {
        console.error("Error adding candidate:", error);
    }
};

// Function to remove a candidate (only owner)
export const removeCandidate = async (id: number): Promise<void> => {
    try {
        const contract = await getContract();
        if (!contract) return;

        const tx: ethers.ContractTransactionResponse = await contract.removeCandidate(id);
        await tx.wait();
        console.log("Candidate removed:", id);
    } catch (error) {
        console.error("Error removing candidate:", error);
    }
};

// Function to vote for a candidate
export const voteForCandidate = async (id: number): Promise<void> => {
  try {
      const contract = await getContract();
      if (!contract) {
          console.error("Contract is not initialized.");
          return;
      }
      console.log("Voting for candidate ID:", id);

      const tx: ethers.ContractTransactionResponse = await contract.vote(id);
      await tx.wait();

      console.log(`Successfully voted for candidate ID: ${id}`);
  } catch (error: any) {
      console.error("Error voting:", error);

      if (error.message.includes("You have already voted!")) {
          alert("❌ You have already voted!");
      } 
  }
};

// Function to fetch all candidates
export const getCandidates = async (): Promise<{ id: string; name: string; party: string; votes: number }[]> => {
  try {
    const contract = await getContract();
    if (!contract) {
      console.error("Contract is not initialized.");
      return [];
    }

    console.log("Fetching candidates (read-only call)...");

    const candidates = await contract.getAllCandidates({ blockTag: "latest" });

    if (!candidates || candidates.length === 0) {
      console.warn("No candidates found in contract.");
      return [];
    }

    const formattedCandidates = candidates.map((candidate: any) => ({
      id: candidate.id.toString(),
      name: candidate.name,
      party: candidate.party,
      votes: Number(candidate.voteCount),
    }));

    console.log("Fetched candidates:", formattedCandidates);
    return formattedCandidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};
