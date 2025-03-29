import React, { useEffect, useState } from "react";
import { getCandidates } from "../blockchainUtils"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

interface Candidate {
    id: string;
    name: string;
    party: string;
    votes: number;
}

const StatisticsChart: React.FC = () => {
    const [data, setData] = useState<{ name: string; votes: number }[]>([]);
    const [leader, setLeader] = useState<string>("");

    const calculateLeader = (candidatesData: Candidate[]) => {
        if (candidatesData.length === 0) {
            return "No votes yet";
        }

        const totalVotes = candidatesData.reduce((sum, candidate) => sum + Number(candidate.votes), 0);

        if (totalVotes === 0) {
            return "No votes yet";
        }

        const leadingCandidate = candidatesData.reduce((prev, current) =>
            Number(prev.votes) > Number(current.votes) ? prev : current
        );

        return `Leader: ${leadingCandidate.name} with ${Math.round((Number(leadingCandidate.votes) / totalVotes) * 100)}% of votes`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const candidatesData = await getCandidates(); 
    
                const formattedData = candidatesData.map((candidate) => ({
                    name: candidate.name,
                    votes: Number(candidate.votes ?? 0)
                }));
    
                setData(formattedData);
                setLeader(calculateLeader(candidatesData));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);

   
    
    return (
        <div className="container mt-4">
            <Link type="button" className="btn btn-dark mb-3" to="/">
                <i className="bi bi-arrow-left"></i> Back
            </Link>
            <h1 className="text-center mb-5">Voting Statistics</h1>
            <h3 className="text-center">{leader}</h3>
            <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="votes" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatisticsChart;
