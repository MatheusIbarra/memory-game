export class User {
    id: number;
    name: string;
    createdAt: string;
    ranking: Ranking[];
}

export class Ranking {
    rounds: number;
    date: string;
}

export class Card {
    id: number;
    number: number | string;
    suit: 'clubs' | 'hearts' | 'diamonds' | 'spades' ;
    show: boolean = false;
    finded: boolean;
    pairId: number;
}