import { card_list, whos_turn, prompt } from "./new-main";

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
