export interface Prediction {
    winner: string;
    probability: number;
    fighter1_probability: number;
    fighter2_probability: number;
}

export interface PredictionRequest {
  f_1: Fighter;
  f_2: Fighter;
  num_rounds: number;
  title_fight: number;
  weight_class: number;
}
  
export interface Fighter {
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