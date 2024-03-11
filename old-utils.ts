import {
  new_game_crush,
  number_of_players,
  set_number_of_players,
  name_players,
  starting_player,
  shuffleDeck,
  starting_deal,
  print_whos_turn,
  print_current_player_hand,
  consolidateDiscardPileIfNeedBe,
  Card,
  call_number,
  clue_reveal,
  dialed_discard,
  dialed_draw,
  solve,
  count,
  use_pvp,
  end_turn,
} from "./new-main";
import { card_list, whos_turn, prompt } from "./new-main";
import { boy_attribute_table } from "./old-utils";

// functions;
export function clear_screen() {
  /**
 * # Clear screen using click.clear() function
    click.clear()
 */
}
function long_delay() {}
// Some TEXT STYLE stuff
export function blue_out(text: string) {
  // red_out is how i am crossing out entries in the notepad
  return text;
}
export function red_out(text: string) {
  // red_out is how i am crossing out entries in the notepad
  return text;
}
export class PrettyTable {
  constructor(private arry: Array<string>) {}

  public add_row(arry: Array<string>) {
    // todo
  }

  public toString() {
    // TODO
  }
}
// MAX: Required for stats only
export function boy_attribute_table(): void {
  const notepad = new PrettyTable([
    "Called?",
    "Hangout",
    "Sport / Food",
    "Clothing",
    "Secret Admirer?",
  ]); // Specify the Column Names while initializing the Table
  for (const card of card_list) {
    // Iterates over all cards
    let hangout = card.hangout;
    let sport = card.sport;
    let food = card.food;
    let clothing = card.clothing;
    let name = card.name;
    let listname = card.name;
    if (whos_turn().collected_clues.includes(card)) name = red_out(card.name); // Reds out a name you have dialed already in the "dialed" list
    for (const clue of whos_turn().collected_clues) {
      // Iterates over all the clues the player has heard so far
      if (clue.clue_to_reveal === card.sport) sport = red_out(card.sport);
      if (clue.clue_to_reveal === card.hangout) hangout = red_out(card.hangout);
      if (clue.clue_to_reveal === card.food) food = red_out(card.food);
      if (clue.clue_to_reveal === card.clothing)
        clothing = red_out(card.clothing); // If any of the clues collected fit in the category, it gets redded out
    }
    if (card.sport === "null") sport = "";
    if (card.food === "null") food = ""; // Removing null entries for food sport weirdness
    notepad.add_row([name, hangout, sport + food, clothing, listname]); // Adds rows queued up for printing
  }
  clear_screen();
  console.log(notepad.toString()); // Prints notepad
  prompt("Press Enter to continue...");
  clear_screen();
}
function game_loop(): void {
  const crush = new_game_crush();
  const valid_choices: string[] = [
    "null",
    "notepad",
    "dial",
    "end",
    "count",
    "redial",
    "solve",
    "pvp",
  ];
  console.log(
    "\nWelcome to Dream Phone Simulator Version 0.1, a computer simulation of the 1991 board game 'Dreamphone'.\nPlease see included dp_instructions.txt for more information.\n"
  );

  number_of_players = set_number_of_players();
  name_players();

  starting_player();
  shuffleDeck();
  starting_deal();

  while (true) {
    print_whos_turn();
    print_current_player_hand();
    consolidateDiscardPileIfNeedBe();
    console.log(
      "Commands: ('dial') - ('notepad') - ('pvp') - ('solve') - ('redial') - ('end')",

      "\n"
    );
    let choice: string = prompt("").toLowerCase();
    let last_dialed_boy: Card | undefined;

    if (choice.includes("dial") && choice !== "redial") {
      const last_dialed_boy = call_number(choice);
      clue_reveal(last_dialed_boy);
      dialed_discard(last_dialed_boy!);
      dialed_draw();
      choice = "null";
    }

    if (!valid_choices.includes(choice)) {
      console.log("Not a valid choice.");
    } else {
      switch (choice) {
        case "solve":
          solve(crush, number_of_players);
          break;
        case "count":
          count();
          break;
        case "pvp": // Player vs player card
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
        case "notepad":
          boy_attribute_table(); // MAX: Required for stats only
          break;
        case "end":
          end_turn(number_of_players);
          break;
      }
    }
  }
}
