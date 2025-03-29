import React from "react";
import { Routes, Route } from "react-router-dom";
import CandidateList from "./components/CandidateList";
import CeateCandidate from "./components/CreateCandidate";
import Statistics from "./components/StatisticsChart";
import "./App.css";

const App: React.FC = () => {
    return (
        
      <Routes>
          <Route path="/" element={<CandidateList />} />
          <Route path="/create" element={<CeateCandidate />} />
          <Route path="/statistics" element={<Statistics />} />
      </Routes>
    );
};

export default App;
