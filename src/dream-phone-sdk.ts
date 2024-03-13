import {
  new_game_crush,
  consolidateDiscardPileIfNeedBe,
  call_number,
  clue_reveal,
  dialed_discard,
  dialed_draw,
  solve,
  number_of_players,
  count,
  use_pvp,
  crushCard,
  end_turn,
} from "./unrefactored/new-main";
import { Card } from "./types";
import { shuffle } from "./utils";

export class DreamPhoneSdk {
  private crushCard: Card;
  private crushIndex: number;

  constructor(private card_list: Card[]) {
    const [index, card] = this.startNewGame();

    this.crushCard = card;
    this.crushIndex = index;
  }

  public startNewGame(): [number, Card] {
    return this.newGameCrush();
  }

  public dialNumber() {}

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
}
function dreamPhoneSdk() {
  // const crush = new_game_crush();

  while (true) {
    consolidateDiscardPileIfNeedBe();

    let choice: string = ""; // what is the action were doing here
    let last_dialed_boy: Card | undefined;

    last_dialed_boy = call_number(choice);
    clue_reveal(last_dialed_boy, false);
    dialed_discard(last_dialed_boy!);
    dialed_draw();
    choice = "null";

    switch (choice) {
      case "solve":
        // solve(this.crushIndex, number_of_players);
        break;
      case "count":
        count();
        break;
      case "pvp": // Player vs player card - this is something that could be simulated
        use_pvp();
        break;

      case "redial":
        if (!last_dialed_boy) {
          console.log("no call made yet");
        } else {
          console.log(
            `The last boy you called was ${last_dialed_boy.name}. His number was ${last_dialed_boy.phonenum}.`
          );
          clue_reveal(last_dialed_boy);
        }
        break;
      case "cheat":
        console.log(
          crushCard.name,
          " is your crush, their number is :",
          crushCard.phonenum
        );
        break;
      case "end":
        end_turn(number_of_players);
        break;
    }
  }
}
