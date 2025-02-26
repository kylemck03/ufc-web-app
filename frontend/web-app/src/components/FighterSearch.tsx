// components/FighterSearch.tsx
import React, { useState, useEffect } from 'react';
import './FighterSearch.css';

interface Fighter {
  fighter_id: number;
  fighter_f_name: string;
  fighter_l_name: string;
  gender: number;
  fighter_height_cm: number;
  fighter_weight_lbs: number;
  fighter_reach_cm: number;
  fighter_stance: number;
  fighter_w: number;
  fighter_l: number;
  fighter_d: number;
  fighter_dob: number;
  avg_ctrl_time: number;
  avg_reversals: number;
  avg_submission_att: number;
  avg_takedown_succ: number;
  avg_takedown_att: number;
  avg_sig_strikes_att: number;
  avg_total_strikes_succ: number;
  avg_total_strikes_att: number;
  avg_knockdowns: number;
  avg_finish_time: number;
}

interface FighterSearchProps {
  onFighterSelect: (fighter: Fighter) => void;
  label: string;
}

const parseCSV = (csvText: string): Fighter[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1) // Skip headers
    .filter(line => line.trim() !== '') // Skip empty lines
    .map(line => {
      const values = line.split(',');
      return {
        fighter_id: Number(values[0]),
        fighter_f_name: values[31], // Adjust these indices based on your CSV structure
        fighter_l_name: values[32],
        gender: Number(values[9]),
        fighter_height_cm: Number(values[10]),
        fighter_weight_lbs: Number(values[11]),
        fighter_reach_cm: Number(values[12]),
        fighter_stance: Number(values[13]),
        fighter_w: Number(values[15]),
        fighter_l: Number(values[16]),
        fighter_d: Number(values[17]),
        fighter_dob: Number(values[14]),
        avg_ctrl_time: Number(values[21]),
        avg_reversals: Number(values[22]),
        avg_submission_att: Number(values[23]),
        avg_takedown_succ: Number(values[24]),
        avg_takedown_att: Number(values[25]),
        avg_sig_strikes_att: Number(values[26]),
        avg_total_strikes_succ: Number(values[27]),
        avg_total_strikes_att: Number(values[28]),
        avg_knockdowns: Number(values[29]),
        avg_finish_time: Number(values[30])
      };
    });
};

const FighterSearch: React.FC<FighterSearchProps> = ({ onFighterSelect, label }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Fighter[]>([]);
  const [fighters, setFighters] = useState<Fighter[]>([]);

  useEffect(() => {
    // Load the CSV data when component mounts
    fetch('/fighter_names.csv') 
      .then(response => response.text())
      .then(data => {
        // Parse CSV data
        const parsedData = parseCSV(data);
        setFighters(parsedData);
      })
      .catch(error => {
        console.error('Error loading fighter data:', error);
      });
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 1) {
      const filtered = fighters.filter(fighter => 
        `${fighter.fighter_f_name} ${fighter.fighter_l_name}`
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (fighter: Fighter) => {
    setSearchTerm(`${fighter.fighter_f_name} ${fighter.fighter_l_name}`);
    setSuggestions([]);
    onFighterSelect(fighter);
  };

  return (
    <div className="fighter-search">
      <label>{label}</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Enter fighter name..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map(fighter => (
            <li 
              key={fighter.fighter_id}
              onClick={() => handleSelect(fighter)}
            >
              {fighter.fighter_f_name} {fighter.fighter_l_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FighterSearch;
