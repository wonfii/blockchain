import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { addCandidate } from "../blockchainUtils";
import { useNavigate } from "react-router-dom";


const CreateCandidate: React.FC = () => {
    const [fullName, setFullName] = useState<string>("");
    const [party, setParty] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!fullName.trim()) {
            console.error("Candidate name cannot be empty");
            return;
        }

        if (!party.trim()) {
            console.error("Party name cannot be empty");
            return;
        }

        try {
            await addCandidate(fullName, party);
            console.log("Candidate added successfully:", fullName);
            setFullName("");
            setParty("");
            navigate("/");
        } catch (error) {
            console.error("Error adding candidate:", error);
        }
    };

    return (
        <div className="container mt-4">
            <Link type="button" className="btn btn-dark mb-3" to="/">
                <i className="bi bi-arrow-left"></i> Back
            </Link>
            <h2 className="text-center mb-4">Create Candidate</h2>
            <p className="text-center">Please enter the candidate's full name and party</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />                    
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter candidate's party"
                        value={party}
                        onChange={(e) => setParty(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-dark w-100">
                    Create Candidate
                </button>
            </form>
        </div>
    );
};

export default CreateCandidate;
