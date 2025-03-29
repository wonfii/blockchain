import React, { useEffect, useState } from "react";
import { getCandidates, removeCandidate, voteForCandidate } from "../blockchainUtils"; 
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

interface Candidate {
    id: string;
    name: string;
    party : string;
}

const CandidateList: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            const data = await getCandidates();
            setCandidates(data);
        };

        fetchCandidates();
    }, []);

    const handleDelete = async (id: number) => {
        if (id <= 0) {
            console.error("Invalid candidate ID");
            return;
        }

        try {
            console.log("Deleting candidate with ID:", id);
            await removeCandidate(id);
            console.log("Candidate deleted successfully!");

            const updatedCandidates = await getCandidates();
            setCandidates(updatedCandidates);
        } catch (error) {
            console.error("Error deleting candidate:", error);
        }
    };

    const handleVote = async (id: number) => {
        if (id < 1) { 
            console.error("Invalid candidate ID:", id);
            return;
        }
    
        try {
            console.log("Voting for candidate ID:", id);
            await voteForCandidate(id); 
            console.log("Voted successfully!");
    
            const updatedCandidates = await getCandidates();
            setCandidates(updatedCandidates);
        } catch (error) {
            console.error("Error voting for candidate:", error);
        }
    };
    
    return (
        <div className="container mt-4">
            <h1 className="text-center">Voting App</h1>
            <div className="text-center mb-3">
                <Link type="button" className="btn btn-outline-dark" to="/create">
                    Create Candidate
                </Link>
                
            </div>

            <div className="text-center mb-3">
                <Link type="button" className="btn btn-outline-dark" to="/statistics">
                    Show Statistics
                </Link>
                
            </div>

            <h2 className="text-center mb-4">Registered Candidates</h2>
            <div className="row">
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <div key={candidate.id} className="col-md-4 mb-4">
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{candidate.name}</h5>
                                    <p className="card-text">Party: <em>{candidate.party}</em></p>
                                    <button className="btn btn-success" onClick={() => handleVote(Number(candidate.id))}>
                                        Vote <i className="bi bi-check2"></i>
                                    </button>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button
                                            className="btn btn-outline-danger"
                                            type="button"
                                            onClick={() => handleDelete(Number(candidate.id))}
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No candidates found.</p>
                )}
            </div>
        </div>
    );
};

export default CandidateList;
