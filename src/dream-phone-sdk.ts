import { Card } from "./types";
import { shuffle } from "./utils";

enum Response {
  no_reveal = "no_reveal",
  hangout_reveal = "hangout_reveal",
  sport_reveal = "sport_reveal",
  food_reveal = " food_reveal",
  clothing_reveal = "clothing_reveal",
}

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

    const getClue = this.clue_reveal(boy);
  }

  public redialLastNumber() {}

  public guess() {}

  public speakerPhone() {}

  private newGameCrush(): [number, Card] {
    const clue_list: string[] = []; // makes bucket to hold all valid clues in
    this.crushIndex = Math.floor(Math.random() * this.card_list.length); // rng a boy from the card list to be the crush, adjusting len from starting at 1 while list index starts at 0
    this.crushCard = this.card_list[this.crushIndex];

    for (const card of this.card_list) {
      // creates a list of all possible clues in clue_list, removing "null" entries for food sport weirdness
      if (card.hangout !== "null") clue_list.push(card.hangout);
      if (card.sport !== "null") clue_list.push(card.sport);
      if (card.food !== "null") clue_list.push(card.food);
      if (card.clothing !== "null") clue_list.push(card.clothing);
    }

    let uniqueClues = Array.from(new Set(clue_list)); // removes all duplicate entries from the list
    uniqueClues = shuffle(uniqueClues); // shuffles clue list

    for (let i = 0; i < uniqueClues.length; i++) {
      // distributes all clues to all cards' "clue to reveal" player object attribute
      this.card_list[i].clue_to_reveal = uniqueClues[i];
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
      console.log("*ring*");
    }

    return boyToCall;
  }

  // was formerly clue_reveal
  private clue_reveal(boy: Card | undefined) {
    if (!boy) return;

    let response: Response | undefined;

    // Rejection check: // Max we can set clue to reveal to null earlier and make it say. Im not telling
    if (
      boy.clue_to_reveal === this.crushCard.hangout ||
      boy.clue_to_reveal === this.crushCard.sport ||
      boy.clue_to_reveal === this.crushCard.food ||
      boy.clue_to_reveal === this.crushCard.clothing
    ) {
      response = Response.no_reveal;
    }

    // Type of reveal check:
    const no_crush_list = this.card_list.filter(
      (card) => card !== this.crushCard
    );

    for (const card of no_crush_list) {
      if (boy.clue_to_reveal === card.hangout)
        response = Response.hangout_reveal;
      if (boy.clue_to_reveal === card.sport) response = Response.sport_reveal;
      if (boy.clue_to_reveal === card.food) response = Response.food_reveal;
      if (boy.clue_to_reveal === card.clothing)
        response = Response.clothing_reveal;
    }

    if (boy.first_call) {
      console.log(
        `Hello? This is ${boy.name}. You want to know about your crush?`
      );
    } else {
      console.log("You again? I already told you...");
    }

    // MAX: TODO make response an enum

    if (response === Response.hangout_reveal)
      console.log("I know where he hangs out,");
    if (response === Response.sport_reveal) console.log("He is very athletic,");
    if (response === Response.food_reveal)
      console.log("He eats a lot of food,");
    if (response === Response.clothing_reveal)
      console.log("He looks good in whatever he wears,");

    let grammar: string = "";
    if (["Hat", "Jacket", "Tie"].includes(boy.clue_to_reveal)) {
      grammar = "a";
    }

    if (response === Response.hangout_reveal)
      console.log(`but he doesn't hang out at ${boy.clue_to_reveal}.`, "\n");
    if (response === Response.sport_reveal)
      console.log(
        `but he doesn't like ${boy.clue_to_reveal.toLowerCase()}.`,
        "\n"
      );
    if (response === Response.food_reveal)
      console.log(
        `but he hates the taste of ${boy.clue_to_reveal.toLowerCase()}.`,
        "\n"
      );
    if (response === Response.clothing_reveal)
      console.log(
        `but he doesn't wear ${grammar} ${boy.clue_to_reveal.toLowerCase()}.`,
        "\n"
      );

    // this.allClues.push(boy); // TODO reinstate

    boy.first_call = false;
  }
}

// function dreamPhoneSdk() {
//   while (true) {
//     let choice: string = ""; // what is the action were doing here
//     let last_dialed_boy: Card | undefined;

//     clue_reveal(last_dialed_boy, false);
//     dialed_discard(last_dialed_boy!);
//     dialed_draw();
//     choice = "null";

//     switch (choice) {
//       case "solve":
//         // solve(this.crushIndex, number_of_players);
//         break;
//       case "count":
//         count();
//         break;
//       case "pvp": // Player vs player card - this is something that could be simulated
//         use_pvp();
//         break;

//       case "redial":
//         if (!last_dialed_boy) {
//           console.log("no call made yet");
//         } else {
//           console.log(
//             `The last boy you called was ${last_dialed_boy.name}. His number was ${last_dialed_boy.phonenum}.`
//           );
//           clue_reveal(last_dialed_boy);
//         }
//         break;
//       case "cheat":
//         console.log(
//           crushCard.name,
//           " is your crush, their number is :",
//           crushCard.phonenum
//         );
//         break;
//       case "end":
//         end_turn(number_of_players);
//         break;
//     }
//   }
// }
