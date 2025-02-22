// src/components/FighterForm.tsx
import React, { useState } from 'react';
import FighterSearch from './FighterSearch';
import './FighterForm.css';

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

interface FighterFormData {
  fighter1: Fighter | null;
  fighter2: Fighter | null;
  num_rounds: number;
  title_fight: number;
  weight_class: number;
}

interface PredictionResponse {
  winner: string;
  probability: number;
  fighter1_probability: number;
  fighter2_probability: number;
}

const FighterForm: React.FC = () => {
  const [formData, setFormData] = useState<FighterFormData>({
    fighter1: null,
    fighter2: null,
    num_rounds: 3,
    title_fight: 0,
    weight_class: 0
  });

  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setIsLoading(true);

    if (!formData.fighter1 || !formData.fighter2) {
      setError("Please select both fighters");
      setIsLoading(false);
      return;
    }

    const predictionRequest = {
      fighter1: {
        f_1: formData.fighter1.fighter_id,
        num_rounds: formData.num_rounds,
        title_fight: formData.title_fight,
        weight_class: formData.weight_class,
        gender: formData.fighter1.gender,
        fighter_height_cm: formData.fighter1.fighter_height_cm,
        fighter_weight_lbs: formData.fighter1.fighter_weight_lbs,
        fighter_reach_cm: formData.fighter1.fighter_reach_cm,
        fighter_stance: formData.fighter1.fighter_stance,
        fighter_w: formData.fighter1.fighter_w,
        fighter_l: formData.fighter1.fighter_l,
        fighter_d: formData.fighter1.fighter_d,
        fighter_dob: formData.fighter1.fighter_dob,
        avg_ctrl_time: formData.fighter1.avg_ctrl_time,
        avg_reversals: formData.fighter1.avg_reversals,
        avg_submission_att: formData.fighter1.avg_submission_att,
        avg_takedown_succ: formData.fighter1.avg_takedown_succ,
        avg_takedown_att: formData.fighter1.avg_takedown_att,
        avg_sig_strikes_att: formData.fighter1.avg_sig_strikes_att,
        avg_total_strikes_succ: formData.fighter1.avg_total_strikes_succ,
        avg_total_strikes_att: formData.fighter1.avg_total_strikes_att,
        avg_knockdowns: formData.fighter1.avg_knockdowns,
        avg_finish_time: formData.fighter1.avg_finish_time
      },
      fighter2: {
        f_1: formData.fighter2.fighter_id,
        num_rounds: formData.num_rounds,
        title_fight: formData.title_fight,
        weight_class: formData.weight_class,
        gender: formData.fighter2.gender,
        fighter_height_cm: formData.fighter2.fighter_height_cm,
        fighter_weight_lbs: formData.fighter2.fighter_weight_lbs,
        fighter_reach_cm: formData.fighter2.fighter_reach_cm,
        fighter_stance: formData.fighter2.fighter_stance,
        fighter_w: formData.fighter2.fighter_w,
        fighter_l: formData.fighter2.fighter_l,
        fighter_d: formData.fighter2.fighter_d,
        fighter_dob: formData.fighter2.fighter_dob,
        avg_ctrl_time: formData.fighter2.avg_ctrl_time,
        avg_reversals: formData.fighter2.avg_reversals,
        avg_submission_att: formData.fighter2.avg_submission_att,
        avg_takedown_succ: formData.fighter2.avg_takedown_succ,
        avg_takedown_att: formData.fighter2.avg_takedown_att,
        avg_sig_strikes_att: formData.fighter2.avg_sig_strikes_att,
        avg_total_strikes_succ: formData.fighter2.avg_total_strikes_succ,
        avg_total_strikes_att: formData.fighter2.avg_total_strikes_att,
        avg_knockdowns: formData.fighter2.avg_knockdowns,
        avg_finish_time: formData.fighter2.avg_finish_time
      }
    };

    console.log('Prediction request:', predictionRequest); // Debug log

    try {
      const response = await fetch('https://ufc-web-app.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(predictionRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Prediction result:', result); // Debug log
      setPrediction(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fighter-form-container">
      <form onSubmit={handleSubmit} className="fighter-form">
        <div className="fighters-section">
          <FighterSearch 
            label="Fighter 1"
            onFighterSelect={(fighter) => setFormData({...formData, fighter1: fighter})}
          />
          <FighterSearch 
            label="Fighter 2"
            onFighterSelect={(fighter) => setFormData({...formData, fighter2: fighter})}
          />
        </div>

        <div className="form-controls">
          <div className="form-group">
            <label>Number of Rounds:</label>
            <input
              type="number"
              min="3"
              max="5"
              value={formData.num_rounds}
              onChange={(e) => setFormData({...formData, num_rounds: parseInt(e.target.value)})}
            />
          </div>

          <div className="form-group">
            <label>Title Fight:</label>
            <select
              value={formData.title_fight}
              onChange={(e) => setFormData({...formData, title_fight: parseInt(e.target.value)})}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Weight Class:</label>
            <select
              value={formData.weight_class}
              onChange={(e) => setFormData({...formData, weight_class: parseInt(e.target.value)})}
            >
              <option value={0}>Flyweight</option>
              <option value={1}>Bantamweight</option>
              <option value={2}>Featherweight</option>
              <option value={3}>Lightweight</option>
              <option value={4}>Welterweight</option>
              <option value={5}>Middleweight</option>
              <option value={6}>Light Heavyweight</option>
              <option value={7}>Heavyweight</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Predicting...' : 'Predict Fight'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result</h3>
          <div className="prediction-details">
            <div className="fighter-probability">
              <p>{formData.fighter1?.fighter_f_name} {formData.fighter1?.fighter_l_name}</p>
              <p className="probability">
                {(prediction.fighter1_probability * 100).toFixed(1)}%
              </p>
            </div>
            <div className="winner-section">
              <p>Predicted Winner</p>
              <p className="winner">{prediction.winner}</p>
              <p className="overall-probability">
                Confidence: {(prediction.probability * 100).toFixed(1)}%
              </p>
            </div>
            <div className="fighter-probability">
              <p>{formData.fighter2?.fighter_f_name} {formData.fighter2?.fighter_l_name}</p>
              <p className="probability">
                {(prediction.fighter2_probability * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-indicator">
          Calculating prediction...
        </div>
      )}
    </div>
  );
};

export default FighterForm;
