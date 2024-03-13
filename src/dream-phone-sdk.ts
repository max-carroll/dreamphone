import { Response } from "./types";
import { Clue } from "./types";
import { Card } from "./types";
import { shuffle } from "./utils";

export class DreamPhoneSdk {
  private crushCard: Card;
  private crushIndex: number;
  private redialNumber?: string;

  constructor(private card_list: Card[]) {
    const [index, card] = this.startNewGame();

    this.crushCard = card;
    this.crushIndex = index;
  }

  public startNewGame(): [number, Card] {
    return this.newGameCrush();
  }

  public dialNumber(phoneNumber: string) {
    this.redialNumber = phoneNumber;
    const boy = this.getBoyByPhoneNumber(phoneNumber); // MAX Todo, this could be set to the last dialed boy here?

    if (boy) {
      this.clue_reveal(boy);
    } else {
      console.log("sorry wrong number");
    }
  }

  public redialLastNumber() {}

  public guess() {}

  public speakerPhone() {}

  private newGameCrush(): [number, Card] {
    const clue_list: Array<Clue> = []; // makes bucket to hold all valid clues in
    this.crushIndex = Math.floor(Math.random() * this.card_list.length); // rng a boy from the card list to be the crush, adjusting len from starting at 1 while list index starts at 0
    this.crushCard = this.card_list[this.crushIndex];

    for (const card of this.card_list) {
      // creates a list of all possible clues in clue_list, removing "null" entries for food sport weirdness
      if (card.hangout !== "null")
        clue_list.push({ type: Response.hangout_reveal, value: card.hangout });
      if (card.sport !== "null")
        clue_list.push({ type: Response.sport_reveal, value: card.sport });
      if (card.food !== "null")
        clue_list.push({ type: Response.food_reveal, value: card.food });
      if (card.clothing !== "null")
        clue_list.push({
          type: Response.clothing_reveal,
          value: card.clothing,
        });
    }

    let uniqueClues: Array<Clue> = [];

    for (var clue of clue_list) {
      if (!uniqueClues.find((c) => c.value === clue.value)) {
        uniqueClues.push(clue);
      }
    }

    uniqueClues = shuffle(uniqueClues); // shuffles clue list

    for (let i = 0; i < uniqueClues.length; i++) {
      const { clothing, sport, food, hangout } = this.crushCard;

      if ([clothing, sport, food, hangout].includes(uniqueClues[i].value)) {
        this.card_list[i].clue_to_reveal = {
          type: Response.no_reveal,
          value: "I know who it is but I'm not telling",
        };
      } else {
        this.card_list[i].clue_to_reveal = uniqueClues[i];
      }
    }
    return [this.crushIndex, this.crushCard];
  }

  public test_dialEveryone() {
    this.card_list.forEach((c) => this.dialNumber(c.phonenum));
  }

  // Was formerly call_number, I've deleted game mechanics
  private getBoyByPhoneNumber(phoneNumber: string): Card | undefined {
    const boyToCall = this.card_list.find((b) => b.phonenum === phoneNumber);

    for (let x = 0; x < 3; x++) {
      // console.log("*ring*");
    }

    return boyToCall;
  }

  // was formerly clue_reveal
  private clue_reveal(boy: Card) {
    const response = boy.clue_to_reveal.type;

    if (boy.first_call) {
      console.log(
        `Hello? This is ${boy.name}. You want to know about your crush?`
      );
    } else {
      console.log("You again? I already told you...");
    }

    switch (response) {
      case Response.hangout_reveal:
        console.log("I know where he hangs out,");
        console.log(
          `but he doesn't hang out at ${boy.clue_to_reveal.value}.`,
          "\n"
        );
        break;
      case Response.clothing_reveal:
        console.log("He looks good in whatever he wears,");
        let grammar: string = "";
        if (["Hat", "Jacket", "Tie"].includes(boy.clue_to_reveal.value)) {
          grammar = "a";
        }
        console.log(
          `but he doesn't wear ${grammar} ${boy.clue_to_reveal.value.toLowerCase()}.`,
          "\n"
        );
        break;
      case Response.food_reveal:
        console.log("He eats a lot of food,");
        console.log(
          `but he hates the taste of ${boy.clue_to_reveal.value.toLowerCase()}.`,
          "\n"
        );
        break;
      case Response.sport_reveal:
        console.log("He is very athletic,");
        console.log(
          `but he doesn't like ${boy.clue_to_reveal.value.toLowerCase()}.`,
          "\n"
        );
        break;
      case Response.no_reveal:
        console.log(`I know who it is, but I'm not telling! Ha ha!`, "\n");
        break;
      default:
        break;
    }

    boy.first_call = false;
  }
}
