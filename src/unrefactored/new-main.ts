// import promptSync from "prompt-sync";
import { pvp_list } from "../cards";
import { card_list } from "../cards";
import { Card, Pvp_Cards } from "../types";
import { Player } from "../types";
import { shuffle } from "../utils";
// import { , clear_screen,  } from "./old-utils";

// export const prompt = promptSync();

function prompt(asdf: string) {
  return asdf;
}

export let player1 = new Player(1, [], false, "", [], false, false, [], false);
export let player2 = new Player(2, [], false, "", [], false, false, [], false);
export let player3 = new Player(3, [], false, "", [], false, false, [], false);
export let player4 = new Player(4, [], false, "", [], false, false, [], false);

let all_player_list = [player1, player2, player3, player4]; // all possible players in the game
let player_list: Array<Player> = []; // a list built out by the player's choice of player num
let crushIndex = 0; // initalizes game crush global var
export let crushCard: Card;
let allClues: Array<Card> = [];
let playerWhosTurnItIs: Player | undefined;

// MAX: there's another game state above, where should this go

// Game State
let game_deck = [...card_list]; // # this clones from the master list for the "in game" deck. Use game_deck when moving stuff around, use card_list as universal master ref)

let discard_pile: Array<Card> = []; // # initializes discard pile as empty
export let number_of_players = 0;

export function new_game_crush(): number {
  const clue_list: string[] = []; // makes bucket to hold all valid clues in
  crushIndex = Math.floor(Math.random() * card_list.length); // rng a boy from the card list to be the crush, adjusting len from starting at 1 while list index starts at 0
  crushCard = card_list[crushIndex];

  for (const card of card_list) {
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
    card_list[i].clue_to_reveal = uniqueClues[i];
  }
  return crushIndex;
}

export function starting_deal(): void {
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
  }
}

export function consolidateDiscardPileIfNeedBe(): void {
  if (game_deck.length === 0) reshuffle();
}

export function print_whos_turn(): Player {
  for (const player of player_list) {
    if (player.current_turn === true) {
      console.log(
        `\nIt is ${player.playername}'s turn (Player ${player.playernumber})`
      );
      return player;
    }
  }
  throw new Error("No player's turn found.");
}

export function set_number_of_players(): number {
  console.log("How many players would like to play (1 - 4)?");
  while (true) {
    try {
      const userINput = prompt("");
      const num: number = parseInt(userINput, 10);
      if (num === 1) {
        console.log("\nYou have selected 1 player.");
      } else if (num >= 2 && num <= 4) {
        console.log(`\nYou have selected ${num} players.`); // grammar!
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

export function name_players(): void {
  for (const player of player_list) {
    console.log(`\nPlease give Player ${player.playernumber} a name.`);
    const name: string = prompt("");
    player.playername = name;
  }

  console.log("\nThe names you have chosen are:");

  for (const player of player_list) {
    console.log(`Player ${player.playernumber}, ${player.playername}`);
  }
}

export function starting_player(): void {
  if (player_list.length === 1) {
    for (const player of player_list) {
      player.current_turn = true;
      playerWhosTurnItIs = player;
      break;
    }
    return;
  }
  while (true) {
    console.log(
      "\nPlease choose the starting player by entering their player number."
    );
    const choice: string = prompt("");
    if (choice) {
      let selectedPlayer: number | null = null;
      switch (choice.toLowerCase()) {
        case "1":
          selectedPlayer = 1;
          break;
        case "2":
          selectedPlayer = 2;
          break;
        case "3":
          selectedPlayer = 3;
          break;
        case "4":
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
            playerWhosTurnItIs = player;
            console.log(`Player ${player.playernumber} will go first.`);
          }
        }
        break;
      }
    } else {
      console.log("Not a valid choice.");
    }
  }
}

export function print_current_player_hand(): void {
  if (!playerWhosTurnItIs) return;

  console.log(`${playerWhosTurnItIs.playername}'s current hand is:`);
  for (const card of playerWhosTurnItIs.cardsinhand) {
    console.log(`${card.name} - Phone#: ${card.phonenum}`);
  }
  console.log("PvP: ");
  for (const card of playerWhosTurnItIs.pvp_in_hand) {
    console.log(`|${card.long_name}| `);
  }
  console.log();
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

  console.log(
    `Your revealed clue from ${last_dialed_boy.name} ` +
      `will also be added to their notepad. However, you will gain possession of their expended |Share a Secret| PvP card.`,
    "\n"
  );

  return "secret";
}

function mom_says_hang_up(last_dialed_boy: any): string {
  console.log(
    `\nOh no! ${last_dialed_boy.curse_bucket[0].player_owner.playername} ` +
      `(Player ${last_dialed_boy.curse_bucket[0].player_owner.playernumber}) has cursed your ${last_dialed_boy.name} card with |Mom Says Hang Up|!\n`
  );

  console.log(
    `You must discard your ${last_dialed_boy.name} and lose a turn.`,
    "\n"
  );

  return "hangup";
}

function speakerphone(last_dialed_boy: any): string {
  console.log(
    `Oh no! ${last_dialed_boy.curse_bucket[0].player_owner.playername} ` +
      `(Player ${last_dialed_boy.curse_bucket[0].player_owner.playernumber}) has cursed your ${last_dialed_boy.name} card with |Speakerphone|!`
  );
  console.log(
    `Your revealed clue from ${last_dialed_boy.name} ` +
      `will also be added to every player's notepad.`,
    "\n"
  );

  return "speaker";
}

export function use_pvp(): void {
  if (!playerWhosTurnItIs) return; // MAX: todo - is this right
  const opponent_list: Player[] = [...player_list];
  opponent_list.splice(opponent_list.indexOf(playerWhosTurnItIs), 1); // Remove current player from the opponent list

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

  if (playerWhosTurnItIs.pvp_this_turn === true) {
    console.log("Cannot use more than one PvP card per turn.");
    return;
  }

  if (playerWhosTurnItIs.pvp_this_turn === false) {
    if (playerWhosTurnItIs.pvp_in_hand.length !== 0) {
      console.log(
        "Please select a PvP card to use (number input), or ('exit') to leave."
      );
    } else {
      console.log("You have no PvP Cards to use.");
      return;
    }
  }

  for (const pvp_card of playerWhosTurnItIs.pvp_in_hand) {
    console.log(
      `${playerWhosTurnItIs.pvp_in_hand.indexOf(pvp_card)} - |${
        pvp_card.long_name
      }|`
    );
  }

  let selected_pvp: Pvp_Cards;
  let valid_choice: boolean = false;
  while (!valid_choice) {
    const choice: string = prompt("");
    if (choice === "exit") {
      console.log("\nExiting PvP.");
      return;
    }
    if (!isNaN(parseInt(choice))) {
      if (!op_player_nums.includes(parseInt(choice))) {
        console.log("Entered number not in range of valid choices, try again.");
      }
      for (const pvp_card of playerWhosTurnItIs.pvp_in_hand) {
        if (
          parseInt(choice) === playerWhosTurnItIs.pvp_in_hand.indexOf(pvp_card)
        ) {
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
    `Choose a player to curse with ${
      selected_pvp!.long_name
    }. Type name or number, or ('exit') to leave.`
  );
  for (const opponent of opponent_list) {
    console.log(`${opponent.playernumber} - ${opponent.playername}`);
  }

  let opponent_player: Player;

  valid_choice = false;
  while (!valid_choice) {
    const choice: string = prompt("");
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
          opponent_player = opponent;
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
          opponent_player = opponent;
          valid_choice = true;
          break;
        }
      }
    }
  }

  console.log(`You have selected ${opponent_player!.playername}.\n`);

  const op_player_card_names: string[] = opponent_player!.cardsinhand.map(
    (card) => card.name.toLowerCase()
  );
  const op_player_card_nums: number[] = opponent_player!.cardsinhand.map(
    (_, index) => index
  );

  console.log(
    `Select a card of ${
      opponent_player!.playername
    }'s to curse. Type name or number, or ('exit') to leave.`
  );
  for (const card of opponent_player!.cardsinhand) {
    console.log(
      `${opponent_player!.cardsinhand.indexOf(card)} - |${card.name}|`
    );
  }

  let selected_card: Card;
  valid_choice = false;
  while (!valid_choice) {
    const choice: string = prompt("");
    if (choice === "exit") {
      return;
    }
    if (!isNaN(parseInt(choice))) {
      if (!op_player_card_nums.includes(parseInt(choice))) {
        console.log("Invalid Opponent Card number, try again.");
      }
      for (const card of opponent_player!.cardsinhand) {
        if (parseInt(choice) === opponent_player!.cardsinhand.indexOf(card)) {
          selected_card = card;
          valid_choice = true;
          break;
        }
      }
    } else {
      if (!op_player_card_names.includes(choice.toLowerCase())) {
        console.log("Invalid Opponent Card name, try again.");
      }
      for (const card of opponent_player!.cardsinhand) {
        if (choice.toLowerCase() === card.name.toLowerCase()) {
          selected_card = card;
          valid_choice = true;
          break;
        }
      }
    }
    if (selected_card!.curse_bucket.length > 0) {
      console.log(
        "Sorry, this card is already cursed. Try again on another selection."
      );
      return;
    }
  }

  playerWhosTurnItIs.pvp_this_turn = true;
  console.log(
    `\nYou have cursed ${opponent_player!.playername}'s '${
      selected_card!.name
    }' Boy card with ${selected_pvp!.long_name}.`
  );
  selected_pvp!.used_on.push(opponent_player!);
  selected_card!.curse_bucket.push(selected_pvp!);
  playerWhosTurnItIs.pvp_in_hand.splice(
    playerWhosTurnItIs.pvp_in_hand.indexOf(selected_pvp!),
    1
  );
  console.log("The spent PvP card has been removed from your hand.");
}

export function call_number(choice: string): Card | undefined {
  if (!playerWhosTurnItIs) {
    const [_action, selector] = choice.split(" ");

    const boyToCall = card_list.find(
      (b) =>
        b.phonenum === selector ||
        b.name.toLowerCase() === selector.toLowerCase()
    );

    if (boyToCall) {
      return boyToCall;
    } else {
      return undefined;
    }
  }

  // MAX: decouple journey logic for game mechanics, extract to other library

  if (playerWhosTurnItIs.dialed_this_turn === false) {
    let valid_call: boolean = false;

    for (const card of playerWhosTurnItIs.cardsinhand) {
      if (
        (choice.includes("dial") &&
          choice.includes(card.phonenum.toString())) ||
        (choice.includes("dial") &&
          choice.toLowerCase().includes(card.name.toLowerCase()))
      ) {
        for (let x = 0; x < 3; x++) {
          console.log("*ring*");
        }
        return card;
      }
    }

    console.log(
      "You pick up the phone to make a call. Please enter a number (or name)."
    );

    while (true) {
      const dialed_number: string = prompt("");

      if (dialed_number === "leave") {
        break;
      }

      for (const card of playerWhosTurnItIs.cardsinhand) {
        if (
          dialed_number === card.phonenum.toString() ||
          dialed_number.toLowerCase() === card.name.toLowerCase()
        ) {
          for (let x = 0; x < 3; x++) {
            console.log("*ring*");
          }

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

export function clue_reveal(
  last_dialed_boy: Card | undefined,
  isPlayerGame = true
): string | undefined {
  if (!last_dialed_boy) return;

  let response: string | undefined;

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
      `Hello? This is ${last_dialed_boy.name}. You want to know about your crush?`
    );
  } else {
    console.log("You again? I already told you...");
  }

  if (response === "hangout_reveal") console.log("I know where he hangs out,");
  if (response === "sport_reveal") console.log("He is very athletic,");
  if (response === "food_reveal") console.log("He eats a lot of food,");
  if (response === "clothing_reveal")
    console.log("He looks good in whatever he wears,");

  let grammar: string = "";
  if (["Hat", "Jacket", "Tie"].includes(last_dialed_boy.clue_to_reveal)) {
    grammar = "a";
  }

  if (response === "hangout_reveal")
    console.log(
      `but he doesn't hang out at ${last_dialed_boy.clue_to_reveal}.`,
      "\n"
    );
  if (response === "sport_reveal")
    console.log(
      `but he doesn't like ${last_dialed_boy.clue_to_reveal.toLowerCase()}.`,
      "\n"
    );
  if (response === "food_reveal")
    console.log(
      `but he hates the taste of ${last_dialed_boy.clue_to_reveal.toLowerCase()}.`,
      "\n"
    );
  if (response === "clothing_reveal")
    console.log(
      `but he doesn't wear ${grammar} ${last_dialed_boy.clue_to_reveal.toLowerCase()}.`,
      "\n"
    );

  if (isPlayerGame) {
    playerWhosTurnItIs?.collected_clues.push(last_dialed_boy);
  }

  allClues.push(last_dialed_boy);

  if (curse_mod === "secret") {
    const also_give_clue = last_dialed_boy.curse_bucket[0].player_owner;
    also_give_clue.collected_clues.push(last_dialed_boy);

    if (isPlayerGame) {
      playerWhosTurnItIs?.pvp_in_hand.push(last_dialed_boy.curse_bucket[0]);
    }
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

  return choice;
}

export function dialed_discard(last_dialed_boy: Card): void {
  if (!playerWhosTurnItIs) return;

  if (!playerWhosTurnItIs.dialed_this_turn) {
    const i = playerWhosTurnItIs.cardsinhand.indexOf(last_dialed_boy);
    console.log(`${last_dialed_boy.name} from your hand has been discarded.`);
    discard_pile.push(playerWhosTurnItIs.cardsinhand.splice(i, 1)[0]);
    if (player_list.length > 1) playerWhosTurnItIs.dialed_this_turn = true;
  }
}

export function dialed_draw(): string {
  if (!playerWhosTurnItIs) {
    return "null";
  }

  if (playerWhosTurnItIs.cardsinhand.length < 3) {
    playerWhosTurnItIs.cardsinhand.push(game_deck.shift()!);
    console.log(`${playerWhosTurnItIs.playername} drew a card.`);
  }

  return "null";
}

export function end_turn(number_of_players: number): void {
  if (!playerWhosTurnItIs) return;

  const former_player = playerWhosTurnItIs;
  if (number_of_players > 1) {
    const current_player_num = player_list.indexOf(playerWhosTurnItIs!);
    const next_player_num =
      current_player_num === player_list.length - 1
        ? 0
        : current_player_num + 1;

    console.log(`Ending ${former_player.playername}'s turn.`);

    playerWhosTurnItIs.current_turn = false;
    former_player.dialed_this_turn = false;
    former_player.guessed_this_turn = false;
    former_player.pvp_this_turn = false;
    console.log("next player up:", player_list[next_player_num].playername);

    player_list[next_player_num].current_turn = true;

    for (const card of card_list) {
      card.first_call = true;
    }
  }
}

export function count(): void {
  console.log(`\n====Status====`);

  console.log(`Draw Pile: ${game_deck.length}`);

  console.log(
    `${playerWhosTurnItIs?.playername}'s Hand: ${playerWhosTurnItIs?.cardsinhand.length}`
  );

  console.log(`Discard Pile: ${discard_pile.length}`);
}

export function solve(
  guessedCrushIndex: number,
  number_of_players: number
): void {
  if (playerWhosTurnItIs?.guessed_this_turn) {
    console.log("You cannot guess more than once per turn.");
    return;
  }

  console.log(
    "You think you know who your crush is, huh?\nType your guess to check (name or phone#).\nYou can also look at your notebook by entering ('notebook')."
  );
  const crushCard = card_list[guessedCrushIndex];

  while (true) {
    const solve_choice = prompt("").toLowerCase();

    for (const card of card_list) {
      if (
        solve_choice === crushCard.phonenum ||
        solve_choice === crushCard.name.toLowerCase()
      ) {
        console.log(`${crushCard.name} is your crush!\n`);
        console.log(
          `Congratulations! ${playerWhosTurnItIs?.playername} (Player ${playerWhosTurnItIs?.playernumber}) has won the game.`
        );
        console.log("Game Over!");
        console.log(
          "Thank you for playing! I hope you had fun.\n                                  - Old Kid"
        );
        if (number_of_players > 1) playerWhosTurnItIs!.guessed_this_turn = true;
        return;
      }
      if (
        solve_choice === card.phonenum ||
        solve_choice === card.name.toLowerCase()
      ) {
        console.log("Wrong boy, try again!");
        if (number_of_players > 1) playerWhosTurnItIs!.guessed_this_turn = true;
        return;
      }
    }

    console.log("Invalid input. Try again.");
  }
}

// MAX: todo - could simulate phone ringing at anyt moment in time
export function shuffleDeck() {
  game_deck = shuffle([...game_deck]);
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
    shuffleDeck();
    console.log(
      "\n" + "The discard pile has been shuffled back to the draw pile." + "\n"
    );
  }
}

function playerless_game_loop(): void {
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
    "cheat",
  ];
  console.log(
    "\nWelcome to Dream Phone Simulator Version 0.1, a computer simulation of the 1991 board game 'Dreamphone'.\nPlease see included dp_instructions.txt for more information.\n"
  );

  while (true) {
    consolidateDiscardPileIfNeedBe();
    console.log(
      "Commands: ('dial') - ('notepad') - ('pvp') - ('solve') - ('redial') - ('end')",

      "\n"
    );
    let choice: string = prompt("").toLowerCase();
    let last_dialed_boy: Card | undefined;

    if (choice.includes("dial") && choice !== "redial") {
      // because it may also include the number - thats why its not in the switch block
      const last_dialed_boy = call_number(choice);
      clue_reveal(last_dialed_boy, false);
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
}