export interface RoundMoves {
    challenger: number,
    opponent: number
}

export enum Actor {
    winner,
    loser,
    observer,
    aborted
}
