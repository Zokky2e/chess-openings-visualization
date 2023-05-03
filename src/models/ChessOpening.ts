export interface ChessOpening {
    opening_name:     string;
    side:             string;
    num_games:        number;
    ECO:              string;
    last_played_date: string;
    perf_rating:      number;
    avg_player:       number;
    perc_player_win:  number;
    perc_draw:        number;
    pec_opponent_win: number;
    moves_list:       string;
    move1w:           string;
    move1b:           string;
    move2w:           string;
    move2b:           string;
    move3w:           string;
    move3b:           string;
    move4w:           string;
    move4b:           string;
    perc_white_win:   number;
    perc_black_win:   number;
    white_odds:       number;
    white_wins:       number;
    black_wins:       number;
}
