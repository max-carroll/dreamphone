import { Card, Pvp_Cards } from "./types";

export class Player {
  playernumber: number;
  cardsinhand: Card[]; // Assuming cardsinhand can hold any type of data
  current_turn: boolean;
  playername: string;
  collected_clues: any; // Assuming collected_clues can hold any type of data
  dialed_this_turn: boolean;
  guessed_this_turn: boolean;
  pvp_in_hand: any; // Assuming pvp_in_hand can hold any type of data
  pvp_this_turn: any; // Assuming pvp_this_turn can hold any type of data

  constructor(
    playernumber: number,
    cardsinhand: Card[],
    current_turn: boolean,
    playername: string,
    collected_clues: any,
    dialed_this_turn: boolean,
    guessed_this_turn: boolean,
    pvp_in_hand: Pvp_Cards[],
    pvp_this_turn: any
  ) {
    this.playernumber = playernumber;
    this.cardsinhand = cardsinhand;
    this.current_turn = current_turn;
    this.playername = playername;
    this.collected_clues = collected_clues;
    this.dialed_this_turn = dialed_this_turn;
    this.guessed_this_turn = guessed_this_turn;
    this.pvp_in_hand = pvp_in_hand;
    this.pvp_this_turn = pvp_this_turn;
  }
}
export class Card {
  name: string;
  phonenum: string;
  hangout: string;
  sport: string;
  food: string;
  clothing: string;
  clue_to_reveal: string; // Assuming clue_to_reveal is a string
  first_call: boolean;
  curse_bucket: any; // Assuming curse_bucket can hold any type of data

  constructor(
    name: string,
    phonenum: string,
    hangout: string,
    sport: string,
    food: string,
    clothing: string,
    clue_to_reveal: string,
    first_call: boolean,
    curse_bucket: any
  ) {
    this.name = name;
    this.phonenum = phonenum;
    this.hangout = hangout;
    this.sport = sport;
    this.food = food;
    this.clothing = clothing;
    this.clue_to_reveal = clue_to_reveal;
    this.first_call = first_call;
    this.curse_bucket = curse_bucket;
  }
}

export class Pvp_Cards {
  type: string;
  player_owner: any; // Assuming player_owner can hold any type of data
  used_on: any; // Assuming used_on can hold any type of data
  long_name: string;

  constructor(
    type: string,
    player_owner: any,
    used_on: any,
    long_name: string
  ) {
    this.type = type;
    this.player_owner = player_owner;
    this.used_on = used_on;
    this.long_name = long_name;
  }
}
