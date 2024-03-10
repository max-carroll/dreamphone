class Player {
  playernumber: number;
  cardsinhand: any[]; // Assuming cardsinhand can hold any type of data
  current_turn: boolean;
  playername: string;
  collected_clues: any; // Assuming collected_clues can hold any type of data
  dialed_this_turn: boolean;
  guessed_this_turn: boolean;
  pvp_in_hand: any; // Assuming pvp_in_hand can hold any type of data
  pvp_this_turn: any; // Assuming pvp_this_turn can hold any type of data

  constructor(
    playernumber: number,
    cardsinhand: any[],
    current_turn: boolean,
    playername: string,
    collected_clues: any,
    dialed_this_turn: boolean,
    guessed_this_turn: boolean,
    pvp_in_hand: any,
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

player1 = Player(1, [], False, "", [], False, False, [], False);
player2 = Player(2, [], False, "", [], False, False, [], False);
player3 = Player(3, [], False, "", [], False, False, [], False);
player4 = Player(4, [], False, "", [], False, False, [], False);

all_player_list = [player1, player2, player3, player4]; // all possible players in the game
player_list = []; // a list built out by the player's choice of player num
crush = 0; // initalizes game crush global var

class Cards {
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

// building Cards objects:
c0 = Cards(
  "Dave",
  "555-1111",
  "Crosstown Mall",
  "null",
  "Cookies",
  "Blue Jeans",
  "",
  True,
  []
);
c1 = Cards(
  "George",
  "555-1233",
  "Crosstown Mall",
  "null",
  "Ice Cream",
  "Tie",
  "",
  True,
  []
);
c2 = Cards(
  "Dale",
  "555-4566",
  "Crosstown Mall",
  "null",
  "Ice Cream",
  "Jacket",
  "",
  True,
  []
);
c3 = Cards(
  "Alan",
  "555-7899",
  "Crosstown Mall",
  "null",
  "Cookies",
  "Tie",
  "",
  True,
  []
);
c4 = Cards(
  "James",
  "555-2588",
  "E.A.T.S. Snack Shop",
  "null",
  "Hot Dogs",
  "Jacket",
  "",
  True,
  []
);
c5 = Cards(
  "Phil",
  "555-3333",
  "E.A.T.S. Snack Shop",
  "null",
  "Pizza",
  "Glasses",
  "",
  True,
  []
);
c6 = Cards(
  "Bruce",
  "555-3699",
  "E.A.T.S. Snack Shop",
  "null",
  "Pizza",
  "Tie",
  "",
  True,
  []
);
c7 = Cards(
  "Tyler",
  "555-1477",
  "E.A.T.S. Snack Shop",
  "null",
  "Hot Dogs",
  "Blue Jeans",
  "",
  True,
  []
);
c8 = Cards(
  "Jamal",
  "555-9877",
  "Reel Movies",
  "null",
  "Candy",
  "Tie",
  "",
  True,
  []
);
c9 = Cards(
  "Gary",
  "555-3211",
  "Reel Movies",
  "null",
  "Popcorn",
  "Blue Jeans",
  "",
  True,
  []
);
c10 = Cards(
  "Dan",
  "555-7777",
  "Reel Movies",
  "null",
  "Candy",
  "Blue Jeans",
  "",
  True,
  []
);
c11 = Cards(
  "Spencer",
  "555-6544",
  "Reel Movies",
  "null",
  "Popcorn",
  "Jacket",
  "",
  True,
  []
);
c12 = Cards(
  "Mark",
  "555-8522",
  "Woodland Park",
  "Baseball",
  "null",
  "Hat",
  "",
  True,
  []
);
c13 = Cards(
  "Jason",
  "555-7411",
  "Woodland Park",
  "Baseball",
  "null",
  "Glasses",
  "",
  True,
  []
);
c14 = Cards(
  "Steve",
  "555-9999",
  "Woodland Park",
  "Skateboarding",
  "null",
  "Jacket",
  "",
  True,
  []
);
c15 = Cards(
  "John",
  "555-9633",
  "Woodland Park",
  "Skateboarding",
  "null",
  "Anything Yellow",
  "",
  True,
  []
);
c16 = Cards(
  "Paul",
  "555-5515",
  "High Tide Beach",
  "Volleyball",
  "null",
  "Anything Yellow",
  "",
  True,
  []
);
c17 = Cards(
  "Tony",
  "555-2442",
  "High Tide Beach",
  "Volleyball",
  "null",
  "Hat",
  "",
  True,
  []
);
c18 = Cards(
  "Wayne",
  "555-3535",
  "High Tide Beach",
  "Surfing",
  "null",
  "Anything Yellow",
  "",
  True,
  []
);
c19 = Cards(
  "Mike",
  "555-2226",
  "High Tide Beach",
  "Surfing",
  "null",
  "Hat",
  "",
  True,
  []
);
c20 = Cards(
  "Scott",
  "555-5599",
  "Jim's Gym",
  "Basketball",
  "null",
  "Anything Yellow",
  "",
  True,
  []
);
c21 = Cards(
  "Bob",
  "555-4884",
  "Jim's Gym",
  "Basketball",
  "null",
  "Glasses",
  "",
  True,
  []
);
c22 = Cards(
  "Carlos",
  "555-6668",
  "Jim's Gym",
  "Tennis",
  "null",
  "Hat",
  "",
  True,
  []
);
c23 = Cards(
  "Matt",
  "555-7557",
  "Jim's Gym",
  "Tennis",
  "null",
  "Glasses",
  "",
  True,
  []
);

// ##global stuff##
card_list = [
  c0,
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  c8,
  c9,
  c10,
  c11,
  c12,
  c13,
  c14,
  c15,
  c16,
  c17,
  c18,
  c19,
  c20,
  c21,
  c22,
  c23,
];
// # this is the master list of cards in the deck. a way to reference a var list containing all card object names.
// # tried to find a less brute force way to do this but so far no luck.

class Pvp_Cards {
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

pvp0 = Pvp_Cards("hangup", player1, [], "Mom Says Hang up!");
pvp1 = Pvp_Cards("hangup", player2, [], "Mom Says Hang up!");
pvp2 = Pvp_Cards("hangup", player3, [], "Mom Says Hang up!");
pvp3 = Pvp_Cards("hangup", player4, [], "Mom Says Hang up!");
pvp4 = Pvp_Cards("share_secret", player1, [], "Share a Secret");
pvp5 = Pvp_Cards("share_secret", player2, [], "Share a Secret");
pvp6 = Pvp_Cards("share_secret", player3, [], "Share a Secret");
pvp7 = Pvp_Cards("share_secret", player4, [], "Share a Secret");
pvp8 = Pvp_Cards("speakerphone", player1, [], "Speakerphone");
pvp9 = Pvp_Cards("speakerphone", player2, [], "Speakerphone");
pvp10 = Pvp_Cards("speakerphone", player3, [], "Speakerphone");
pvp11 = Pvp_Cards("speakerphone", player4, [], "Speakerphone");

pvp_list = [
  pvp0,
  pvp1,
  pvp2,
  pvp3,
  pvp4,
  pvp5,
  pvp6,
  pvp7,
  pvp8,
  pvp9,
  pvp10,
  pvp11,
];

game_deck = [...card_list]; // # this clones from the master list for the "in game" deck. Use game_deck when moving stuff around, use card_list as universal master ref)
in_hand = []; // # initializes player hand as empty
discard_pile = []; // # initializes discard pile as empty

#functions;
function clear_screen() {
  /**
 * # Clear screen using click.clear() function
    click.clear()
 */
}

function delay() {}

function short_delay() {}

function long_delay() {}

// Some TEXT STYLE stuff
function blue_out(text) {
  // red_out is how i am crossing out entries in the notepad

  return Back.LIGHTBLACK_EX + Fore.BLUE + text + Style.RESET_ALL;
}
function red_out(text) {
  // red_out is how i am crossing out entries in the notepad

  return Back.RED + Fore.WHITE + text + Style.RESET_ALL;
}
function white_out(text) {
  // red_out is how i am crossing out entries in the notepad

  return Back.WHITE + Fore.BLACK + text + Style.RESET_ALL;
}

function boy_attribute_table(): void {
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
  notepad.align = "l"; // Aligns the table to the left
  clear_screen();
  console.log(notepad.toString()); // Prints notepad
  prompt("Press Enter to continue...");
  clear_screen();
}

function new_game_crush(): number {
  const clue_list: string[] = []; // makes bucket to hold all valid clues in
  const crush: number = Math.floor(Math.random() * card_list.length); // rng a boy from the card list to be the crush, adjusting len from starting at 1 while list index starts at 0
  for (const card of card_list) {
    // creates a list of all possible clues in clue_list, removing "null" entries for food sport weirdness
    if (card.hangout !== "null") clue_list.push(card.hangout);
    if (card.sport !== "null") clue_list.push(card.sport);
    if (card.food !== "null") clue_list.push(card.food);
    if (card.clothing !== "null") clue_list.push(card.clothing);
  }

  const uniqueClues = Array.from(new Set(clue_list)); // removes all duplicate entries from the list
  shuffle(uniqueClues); // shuffles clue list

  for (let i = 0; i < uniqueClues.length; i++) {
    // distributes all clues to all cards' "clue to reveal" player object attribute
    card_list[i].clue_to_reveal = uniqueClues[i];
  }
  return crush;
}

function starting_deal(): void {
  for (let i = 0; i < 3; i++) {
    // gives players 3 deck cards
    for (const player of player_list) {
      player.cardsinhand.push(game_deck.shift()!);
    }
  }
  if (player_list.length === 1)
    console.log(
      "Single Player Mode. PvP Cards Disabled.\nYou have drawn 3 cards from the deck."
    );
  if (player_list.length > 1) {
    for (const p of pvp_list) {
      // gives players pvp cards
      switch (p.player_owner) {
        case player1:
          player1.pvp_in_hand.push(p);
          break;
        case player2:
          player2.pvp_in_hand.push(p);
          break;
        case player3:
          player3.pvp_in_hand.push(p);
          break;
        case player4:
          player4.pvp_in_hand.push(p);
          break;
        default:
          break;
      }
    }
    console.log(
      "All Players have drawn 3 boy cards from the deck,\nand have 3 PvP cards in hand."
    );
    console.log("Starting Game...");
    delay();
    delay();
    clear_screen();
  }
}

function check_decks(): void {
  if (game_deck.length === 0) reshuffle();
}

function whos_turn(): Player {
  for (const player of player_list) {
    if (player.current_turn === true) {
      return player;
    }
  }
  throw new Error("No player's turn found.");
}

function print_whos_turn(): Player {
  for (const player of player_list) {
    if (player.current_turn === true) {
      console.log(
        `\n${Back.LIGHTBLACK_EX + Fore.BLUE}It is ${
          player.playername
        }'s turn (Player ${player.playernumber}).${Style.RESET_ALL}\n`
      );
      return player;
    }
  }
  throw new Error("No player's turn found.");
}

function set_number_of_players(): number {
  console.log("How many players would like to play (1 - 4)?");
  while (true) {
    try {
      const num: number = parseInt(prompt());
      if (num === 1) {
        console.log("\nYou have selected 1 player.");
        delay();
      } else if (num >= 2 && num <= 4) {
        console.log(`\nYou have selected ${num} players.`); // grammar!
        delay();
      }
      const number_of_players: number = num;
      for (let i = 0; i < number_of_players; i++) {
        player_list.push(all_player_list[i]);
      }
      return number_of_players;
    } catch {
      console.log(
        "Please enter ('1','2','3' or '4') to select number of players."
      );
    }
  }
}

function name_players(): void {
  for (const player of player_list) {
    console.log(`\nPlease give Player ${player.playernumber} a name.`);
    const name: string = prompt();
    player.playername = name;
  }

  console.log("\nThe names you have chosen are:");
  short_delay();
  for (const player of player_list) {
    console.log(`Player ${player.playernumber}, ${player.playername}`);
    short_delay();
  }
}

function starting_player(): void {
  if (player_list.length === 1) {
    for (const player of player_list) {
      player.current_turn = true;
      break;
    }
    return;
  }
  while (true) {
    console.log(
      "\nPlease choose the starting player by entering their player number."
    );
    const choice: string = prompt();
    if (choice) {
      let selectedPlayer = null;
      switch (choice.toLowerCase()) {
        case "one":
          selectedPlayer = 1;
          break;
        case "two":
          selectedPlayer = 2;
          break;
        case "three":
          selectedPlayer = 3;
          break;
        case "four":
          selectedPlayer = 4;
          break;
        default:
          selectedPlayer = parseInt(choice);
          break;
      }
      if (!isNaN(selectedPlayer)) {
        for (const player of player_list) {
          if (selectedPlayer === player.playernumber) {
            player.current_turn = true;
            console.log(`Player ${player.playernumber} will go first.`);
            short_delay();
          }
        }
        break;
      }
    } else {
      console.log("Not a valid choice.");
    }
  }
}

function print_current_player_hand(): void {
  console.log(`${whos_turn().playername}'s current hand is:`);
  for (const card of whos_turn().cardsinhand) {
    console.log(`${card.name} - Phone#: ${card.phonenum}`);
    short_delay();
  }
  process.stdout.write("PvP: ");
  for (const card of whos_turn().pvp_in_hand) {
    process.stdout.write(`|${card.long_name}| `);
  }
  console.log();
}

function print_current_curses(): void {
  for (const card of whos_turn().cardsinhand) {
    if (card.curse_bucket.length > 0) {
      for (const curse of card.curse_bucket) {
        console.log(
          `Your ${card.name} card is cursed, curse applied by ${curse.player_owner.playername} with '${curse.long_name}'`
        );
      }
    }
  }
}

function check_for_curse(last_dialed_boy: any): string {
  if (last_dialed_boy.curse_bucket.length > 0) {
    for (const curse of last_dialed_boy.curse_bucket) {
      switch (curse.type) {
        case "hangup":
          return mom_says_hang_up(last_dialed_boy); // end current turn and remove card, add message to player's turn
        case "share_secret":
          return share_a_secret(last_dialed_boy); // continue to clue reveal but apply clue to both players, add message to player who applied curse, card goes into hand of cursed player
        case "speakerphone":
          return speakerphone(last_dialed_boy); // reveal to all, add message to other players, burn card
        default:
          break;
      }
    }
  }
  return "no_curse";
}

function share_a_secret(last_dialed_boy: any): string {
  console.log(
    `\nOh no! ${last_dialed_boy.curse_bucket[0].player_owner.playername} ` +
      `(Player ${last_dialed_boy.curse_bucket[0].player_owner.playernumber}) has cursed your ${last_dialed_boy.name} card with |Share a Secret|!\n`
  );
  long_delay();
  console.log(
    Back.RED + Fore.WHITE,
    `Your revealed clue from ${last_dialed_boy.name} ` +
      `will also be added to their notepad. However, you will gain possession of their expended |Share a Secret| PvP card.`,
    Style.RESET_ALL,
    "\n"
  );
  long_delay();
  long_delay();
  return "secret";
}

function mom_says_hang_up(last_dialed_boy: any): string {
  console.log(
    `\nOh no! ${last_dialed_boy.curse_bucket[0].player_owner.playername} ` +
      `(Player ${last_dialed_boy.curse_bucket[0].player_owner.playernumber}) has cursed your ${last_dialed_boy.name} card with |Mom Says Hang Up|!\n`
  );
  long_delay();
  console.log(
    Back.RED + Fore.WHITE,
    `You must discard your ${last_dialed_boy.name} and lose a turn.`,
    Style.RESET_ALL,
    "\n"
  );
  long_delay();
  long_delay();
  return "hangup";
}

function speakerphone(last_dialed_boy: any): string {
  console.log(
    `Oh no! ${last_dialed_boy.curse_bucket[0].player_owner.playername} ` +
      `(Player ${last_dialed_boy.curse_bucket[0].player_owner.playernumber}) has cursed your ${last_dialed_boy.name} card with |Speakerphone|!`
  );
  console.log(
    Back.RED + Fore.WHITE,
    `Your revealed clue from ${last_dialed_boy.name} ` +
      `will also be added to every player's notepad.`,
    Style.RESET_ALL,
    "\n"
  );
  long_delay();
  long_delay();
  return "speaker";
}

function use_pvp(): void {
  const opponent_list: Player[] = copy(player_list);
  opponent_list.splice(opponent_list.indexOf(whos_turn()), 1); // Remove current player from the opponent list

  const op_player_nums: number[] = opponent_list.map(
    (opponent) => opponent.playernumber
  ); // Get opponent player numbers
  const op_player_names: string[] = opponent_list.map((opponent) =>
    opponent.playername.toLowerCase()
  ); // Get opponent player names

  if (player_list.length === 1) {
    console.log("You cannot use PvP Cards in a 1 player game.");
    return;
  }

  if (whos_turn().pvp_this_turn === true) {
    console.log("Cannot use more than one PvP card per turn.");
    return;
  }

  if (whos_turn().pvp_this_turn === false) {
    if (whos_turn().pvp_in_hand.length !== 0) {
      console.log(
        "Please select a PvP card to use (number input), or ('exit') to leave."
      );
    } else {
      console.log("You have no PvP Cards to use.");
      return;
    }
  }

  for (const pvp_card of whos_turn().pvp_in_hand) {
    console.log(
      `${whos_turn().pvp_in_hand.indexOf(pvp_card)} - |${pvp_card.long_name}|`
    );
  }

  let valid_choice: boolean = false;
  while (!valid_choice) {
    const choice: string = input();
    if (choice === "exit") {
      console.log("\nExiting PvP.");
      return;
    }
    if (!isNaN(parseInt(choice))) {
      if (!op_player_nums.includes(parseInt(choice))) {
        console.log("Entered number not in range of valid choices, try again.");
      }
      for (const pvp_card of whos_turn().pvp_in_hand) {
        if (parseInt(choice) === whos_turn().pvp_in_hand.indexOf(pvp_card)) {
          const selected_pvp: Pvp_Cards = pvp_card;
          console.log(`\nYou chose |${selected_pvp.long_name}|\n`);
          valid_choice = true;
          break;
        }
      }
    } else {
      console.log("Please enter selection as a number. Try again.");
    }
  }

  console.log(
    `Choose a player to curse with ${selected_pvp.long_name}. Type name or number, or ('exit') to leave.`
  );
  for (const opponent of opponent_list) {
    console.log(`${opponent.playernumber} - ${opponent.playername}`);
  }

  valid_choice = false;
  while (!valid_choice) {
    const choice: string = input();
    if (choice === "exit") {
      console.log("\nExiting PvP.");
      return;
    }
    if (!isNaN(parseInt(choice))) {
      if (!op_player_nums.includes(parseInt(choice))) {
        console.log("Entered number not in range of valid choices, try again.");
      }
      for (const opponent of opponent_list) {
        if (parseInt(choice) === opponent.playernumber) {
          const opponent_player: Player = opponent;
          valid_choice = true;
          break;
        }
      }
    } else {
      if (!op_player_names.includes(choice.toLowerCase())) {
        console.log("Invalid player name, try again.");
      }
      for (const opponent of opponent_list) {
        if (choice.toLowerCase() === opponent.playername.toLowerCase()) {
          const opponent_player: Player = opponent;
          valid_choice = true;
          break;
        }
      }
    }
  }

  console.log(`You have selected ${opponent_player.playername}.\n`);

  const op_player_card_names: string[] = opponent_player.cardsinhand.map(
    (card) => card.name.toLowerCase()
  );
  const op_player_card_nums: number[] = opponent_player.cardsinhand.map(
    (_, index) => index
  );

  console.log(
    `Select a card of ${opponent_player.playername}'s to curse. Type name or number, or ('exit') to leave.`
  );
  for (const card of opponent_player.cardsinhand) {
    console.log(
      `${opponent_player.cardsinhand.indexOf(card)} - |${card.name}|`
    );
  }

  valid_choice = false;
  while (!valid_choice) {
    const choice: string = input();
    if (choice === "exit") {
      return;
    }
    if (!isNaN(parseInt(choice))) {
      if (!op_player_card_nums.includes(parseInt(choice))) {
        console.log("Invalid Opponent Card number, try again.");
      }
      for (const card of opponent_player.cardsinhand) {
        if (parseInt(choice) === opponent_player.cardsinhand.indexOf(card)) {
          const selected_card: Cards = card;
          valid_choice = true;
          break;
        }
      }
    } else {
      if (!op_player_card_names.includes(choice.toLowerCase())) {
        console.log("Invalid Opponent Card name, try again.");
      }
      for (const card of opponent_player.cardsinhand) {
        if (choice.toLowerCase() === card.name.toLowerCase()) {
          const selected_card: Cards = card;
          valid_choice = true;
          break;
        }
      }
    }
    if (selected_card.curse_bucket.length > 0) {
      console.log(
        "Sorry, this card is already cursed. Try again on another selection."
      );
      return;
    }
  }

  whos_turn().pvp_this_turn = true;
  console.log(
    `\nYou have cursed ${opponent_player.playername}'s '${selected_card.name}' Boy card with ${selected_pvp.long_name}.`
  );
  selected_pvp.used_on.push(opponent_player);
  selected_card.curse_bucket.push(selected_pvp);
  whos_turn().pvp_in_hand.splice(
    whos_turn().pvp_in_hand.indexOf(selected_pvp),
    1
  );
  console.log("The spent PvP card has been removed from your hand.");
}

function call_number(choice: string): Cards | undefined {
  if (whos_turn().dialed_this_turn === false) {
    let valid_call: boolean = false;

    for (const card of whos_turn().cardsinhand) {
      if (
        (choice.includes("dial") &&
          choice.includes(card.phonenum.toString())) ||
        (choice.includes("dial") &&
          choice.toLowerCase().includes(card.name.toLowerCase()))
      ) {
        for (let x = 0; x < 3; x++) {
          console.log("*ring*");
          short_delay();
        }
        return card;
      }
    }

    console.log(
      "You pick up the phone to make a call. Please enter a number (or name)."
    );

    while (true) {
      const dialed_number: string = input();

      if (dialed_number === "leave") {
        break;
      }

      for (const card of whos_turn().cardsinhand) {
        if (
          dialed_number === card.phonenum.toString() ||
          dialed_number.toLowerCase() === card.name.toLowerCase()
        ) {
          for (let x = 0; x < 3; x++) {
            console.log("*ring*");
            short_delay();
          }
          delay();
          valid_call = true;
          return card;
        }
      }

      if (valid_call && player_list.length > 1) {
        return undefined;
      }

      if (!valid_call) {
        console.log(
          "Wrong number. Try another number or dial ('leave') to exit."
        );
      }
    }
  } else {
    console.log("Cannot dial twice in a single turn.");
  }
  return undefined;
}

function clue_reveal(last_dialed_boy: Cards | undefined): string | undefined {
  try {
    last_dialed_boy;
  } catch (error) {
    last_dialed_boy = undefined;
  }

  if (!last_dialed_boy) return;

  let response: string | undefined;
  const crushCard = card_list[crush];

  // Rejection check:
  if (
    last_dialed_boy.clue_to_reveal === crushCard.hangout ||
    last_dialed_boy.clue_to_reveal === crushCard.sport ||
    last_dialed_boy.clue_to_reveal === crushCard.food ||
    last_dialed_boy.clue_to_reveal === crushCard.clothing
  ) {
    response = "no_reveal";
  }

  // Type of reveal check:
  const no_crush_list = card_list.filter((card) => card !== crushCard);

  for (const card of no_crush_list) {
    if (last_dialed_boy.clue_to_reveal === card.hangout)
      response = "hangout_reveal";
    if (last_dialed_boy.clue_to_reveal === card.sport)
      response = "sport_reveal";
    if (last_dialed_boy.clue_to_reveal === card.food) response = "food_reveal";
    if (last_dialed_boy.clue_to_reveal === card.clothing)
      response = "clothing_reveal";
  }

  const curse_mod = check_for_curse(last_dialed_boy);

  if (curse_mod === "hangup") {
    last_dialed_boy.curse_bucket.shift();
    dialed_discard(last_dialed_boy);
    return;
  }

  if (last_dialed_boy.first_call) {
    console.log(
      blue_out(
        `Hello? This is ${last_dialed_boy.name}. You want to know about your crush?`
      )
    );
    long_delay();
  } else {
    console.log(blue_out("You again? I already told you..."));
    long_delay();
  }

  if (response === "hangout_reveal")
    console.log(blue_out("I know where he hangs out,"));
  if (response === "sport_reveal")
    console.log(blue_out("He is very athletic,"));
  if (response === "food_reveal")
    console.log(blue_out("He eats a lot of food,"));
  if (response === "clothing_reveal")
    console.log(blue_out("He looks good in whatever he wears,"));

  long_delay();

  let grammar: string = "";
  if (["Hat", "Jacket", "Tie"].includes(last_dialed_boy.clue_to_reveal)) {
    grammar = "a";
  }

  if (response === "hangout_reveal")
    console.log(
      red_out(`but he doesn't hang out at ${last_dialed_boy.clue_to_reveal}.`),
      "\n"
    );
  if (response === "sport_reveal")
    console.log(
      red_out(
        `but he doesn't like ${last_dialed_boy.clue_to_reveal.toLowerCase()}.`
      ),
      "\n"
    );
  if (response === "food_reveal")
    console.log(
      red_out(
        `but he hates the taste of ${last_dialed_boy.clue_to_reveal.toLowerCase()}.`
      ),
      "\n"
    );
  if (response === "clothing_reveal")
    console.log(
      red_out(
        `but he doesn't wear ${grammar} ${last_dialed_boy.clue_to_reveal.toLowerCase()}.`
      ),
      "\n"
    );

  whos_turn().collected_clues.push(last_dialed_boy);

  if (curse_mod === "secret") {
    const also_give_clue = last_dialed_boy.curse_bucket[0].player_owner;
    also_give_clue.collected_clues.push(last_dialed_boy);
    whos_turn().pvp_in_hand.push(last_dialed_boy.curse_bucket[0]);
    last_dialed_boy.curse_bucket.shift();
  }

  if (curse_mod === "speaker") {
    for (const player of player_list) {
      player.collected_clues.push(last_dialed_boy);
    }
    last_dialed_boy.curse_bucket.shift();
  }

  last_dialed_boy.first_call = false;
  let choice: string = "null";
  long_delay();
  return choice;
}

function dialed_discard(last_dialed_boy: Cards): void {
  if (!whos_turn().dialed_this_turn) {
    const i = whos_turn().cardsinhand.indexOf(last_dialed_boy);
    console.log(`${last_dialed_boy.name} from your hand has been discarded.`);
    discard_pile.push(whos_turn().cardsinhand.splice(i, 1)[0]);
    if (player_list.length > 1) whos_turn().dialed_this_turn = true;
  }
}

function dialed_draw(): string {
  if (whos_turn().cardsinhand.length < 3) {
    whos_turn().cardsinhand.push(game_deck.shift()!);
    console.log(`${whos_turn().playername} drew a card.`);
  }
  let choice: string = "null";
  return choice;
}

function end_turn(number_of_players: number): void {
  const former_player = whos_turn();
  if (number_of_players > 1) {
    const current_player_num = player_list.indexOf(whos_turn());
    const next_player_num =
      current_player_num === player_list.length - 1
        ? 0
        : current_player_num + 1;

    console.log(`Ending ${whos_turn().playername}'s turn.`);
    delay();
    whos_turn().current_turn = false;
    former_player.dialed_this_turn = false;
    former_player.guessed_this_turn = false;
    former_player.pvp_this_turn = false;
    console.log("next player up:", player_list[next_player_num].playername);
    delay();
    player_list[next_player_num].current_turn = true;

    for (const card of card_list) {
      card.first_call = true;
    }
    clear_screen();
  }
}

function count(): void {
  console.log(`\n====Status====`);
  short_delay();
  console.log(`Draw Pile: ${game_deck.length}`);
  short_delay();
  console.log(
    `${whos_turn().playername}'s Hand: ${whos_turn().cardsinhand.length}`
  );
  short_delay();
  console.log(`Discard Pile: ${discard_pile.length}`);
  short_delay();
}

function solve(crush: number, number_of_players: number): void {
  if (whos_turn().guessed_this_turn) {
    console.log("You cannot guess more than once per turn.");
    return;
  }

  console.log(
    "You think you know who your crush is, huh?\nType your guess to check (name or phone#).\nYou can also look at your notebook by entering ('notebook')."
  );
  const crush_object = card_list[crush];
  let valid_solve_input = false;

  while (true) {
    const solve_choice = input().toLowerCase();

    for (const card of card_list) {
      if (
        solve_choice === crush_object.phonenum ||
        solve_choice === crush_object.name.toLowerCase()
      ) {
        console.log(`${crush_object.name} is your crush!\n`);
        console.log(
          `Congratulations! ${whos_turn().playername} (Player ${
            whos_turn().playernumber
          }) has won the game.`
        );
        console.log("Game Over!");
        console.log(
          "Thank you for playing! I hope you had fun.\n                                  - Old Kid"
        );
        if (number_of_players > 1) whos_turn().guessed_this_turn = true;
        return;
      }
      if (
        solve_choice === card.phonenum ||
        solve_choice === card.name.toLowerCase()
      ) {
        console.log("Wrong boy, try again!");
        if (number_of_players > 1) whos_turn().guessed_this_turn = true;
        return;
      }
    }

    console.log("Invalid input. Try again.");
  }
}

function shuffle(): void {
  random.shuffle(game_deck);
  console.log("\nCards in the game deck have been shuffled.");
  delay();
}

function reshuffle(): void {
  if (discard_pile.length === 0) {
    console.log(
      "There's nothing in the discard pile to shuffle back into the deck."
    );
  } else {
    for (let i = 0; i < discard_pile.length; i++) {
      game_deck.push(discard_pile.shift()!);
    }
    random.shuffle(game_deck);
    console.log(
      "\n" +
        blue_out("The discard pile has been shuffled back to the draw pile.") +
        "\n"
    );
  }
}

function game_loop(): void {
  clear_screen();
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
  delay();
  const number_of_players = set_number_of_players();
  name_players();
  delay();
  starting_player();
  shuffle();
  starting_deal();

  while (true) {
    print_whos_turn();
    print_current_player_hand();
    check_decks();
    console.log(
      white_out(
        "Commands: ('dial') - ('notepad') - ('pvp') - ('solve') - ('redial') - ('end')"
      ),
      "\n"
    );
    let choice: string = input().toLowerCase();

    if (choice.includes("dial") && choice !== "redial") {
      const last_dialed_boy = call_number(choice);
      clue_reveal(last_dialed_boy);
      dialed_discard(last_dialed_boy);
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
        case "pvp":
          use_pvp();
          break;
        case "show":
          show_deck();
          show_hand();
          show_discard();
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
          boy_attribute_table();
          break;
        case "end":
          end_turn(number_of_players);
          break;
      }
    }
  }
}

game_loop();
