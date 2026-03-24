import { useState } from "react";
// ─── ALL ABILITIES AND STATS SOURCED FROM WAHAPEDIA / SCREENSHOTS ─────────────
const UNITS = {
  "Intercessor Squad": {
    name: "Intercessor Squad",
    role: "Battleline Infantry",
    stats: { M: '6"', T: 4, Sv: "3+", W: 2, Ld: "6+", OC: 2, InvSv: "—" },
    abilities: [
      { name: "OATH OF MOMENT (Faction)", desc: "At the start of your Command phase, select one enemy unit. ADEPTUS ASTARTES units re-roll Hit rolls of 1 against that unit for the rest of the battle round." },
    ],
    weapons: [
      { name: "Bolt rifle", range: '30"', A: 2, ws: "3+", S: 4, AP: -1, D: 1, keywords: "[HEAVY], [RAPID FIRE 1]" },
      { name: "Bolt pistol", range: '12"', A: 1, ws: "3+", S: 4, AP: 0, D: 1, keywords: "[PISTOL]" },
      { name: "Close combat weapon", range: "Melee", A: 2, ws: "3+", S: 4, AP: 0, D: 1, keywords: "" },
      { name: "Power weapon (Sergeant)", range: "Melee", A: 3, ws: "3+", S: 5, AP: -2, D: 1, keywords: "" },
    ],
    keywords: ["INFANTRY", "BATTLELINE", "ADEPTUS ASTARTES", "DARK ANGELS", "TACTICUS", "INTERCESSORS"],
    notes: "OC 2 — primary objective holders. Bolt rifles are [HEAVY] so don't Advance unless you need to reposition. [RAPID FIRE 1] at 15\" gives 3 attacks per model. Hold them on home or mid objectives all game."
  },
  "Deathwing Knights": {
    name: "Deathwing Knights",
    role: "Elite Terminator Infantry",
    stats: { M: '5"', T: 5, Sv: "2+", W: 3, Ld: "6+", OC: 1, InvSv: "4+" },
    abilities: [
      { name: "DEEP STRIKE", desc: "Can be set up in Reserves. In your Reinforcement step, set up anywhere 9\"+ from all enemy models." },
      { name: "INNER CIRCLE", desc: "Each time an attack is allocated to a model in this unit, subtract 1 from the Damage characteristic of that attack (minimum 1)." },
      { name: "TELEPORT HOMER", desc: "At the start of the battle, set up one Teleport Homer token anywhere not in the opponent's deployment zone. Once per battle, you can use the Rapid Ingress Stratagem on this unit for 0CP, but must set up within 3\" of the token and 9\"+ from enemies. Token is then removed." },
      { name: "WATCHER IN THE DARK (optional wargear)", desc: "Once per battle, in any phase, just after a mortal wound is allocated to an ADEPTUS ASTARTES model in this unit, this unit can summon a Watcher in the Dark." },
    ],
    weapons: [
      { name: "Mace of absolution (strike)", range: "Melee", A: 4, ws: "3+", S: 8, AP: -2, D: 2, keywords: "" },
      { name: "Mace of absolution (sweep)", range: "Melee", A: 8, ws: "3+", S: 5, AP: -1, D: 1, keywords: "" },
      { name: "Great weapon of the Unforgiven (Knight Master)", range: "Melee", A: 4, ws: "3+", S: 8, AP: -3, D: 3, keywords: "[DEVASTATING WOUNDS]" },
    ],
    keywords: ["INFANTRY", "IMPERIUM", "DEATHWING", "TERMINATOR", "DEATHWING KNIGHTS"],
    notes: "The armoured fist. INNER CIRCLE: every incoming attack loses 1 Damage — combined with 2+ save and 4++, they are extremely hard to kill. TELEPORT HOMER gives a free once-per-battle Rapid Ingress. Deep Strike 9\"+ then charge. Judiciar attached = unit gets Fights First — devastating on defence. DUTIFUL TENACITY detachment rule further reduces wounds from high-Strength weapons."
  },
  "Desolation Squad": {
    name: "Desolation Squad",
    role: "Fire Support Infantry",
    stats: { M: '6"', T: 4, Sv: "3+", W: 2, Ld: "6+", OC: 1, InvSv: "—" },
    abilities: [
      { name: "INDIRECT FIRE", desc: "All weapons on this datasheet have [INDIRECT FIRE] — can target units without line of sight at -1 to Hit." },
      { name: "SKY-HAMMER MISSILES", desc: "Each time this unit is selected to shoot, up to 2 models can fire sky-hammer missiles: Range 48\", A1, S7, AP-1, D2, [ANTI-FLY 2+], [INDIRECT FIRE]." },
      { name: "SUPERKRAK ROCKETS", desc: "One model can be equipped with Superkrak rockets instead of Superfrag: Range 48\", A1, S14, AP-3, D(D6+2), [INDIRECT FIRE], [DEVASTATING WOUNDS]." },
    ],
    weapons: [
      { name: "Superfrag rocket launcher", range: '48"', A: "D3", ws: "4+", S: 5, AP: -1, D: 2, keywords: "[BLAST], [INDIRECT FIRE]" },
      { name: "Castellan launcher", range: '48"', A: 2, ws: "4+", S: 4, AP: 0, D: 1, keywords: "[INDIRECT FIRE]" },
      { name: "Superkrak rocket (1 model only)", range: '48"', A: 1, ws: "4+", S: 14, AP: -3, D: "D6+2", keywords: "[INDIRECT FIRE], [DEVASTATING WOUNDS]" },
    ],
    keywords: ["INFANTRY", "ADEPTUS ASTARTES", "DARK ANGELS", "TACTICUS", "DESOLATION SQUAD"],
    notes: "Static artillery — never move them. All weapons fire [INDIRECT FIRE] with no line of sight required. Park in cover and shoot anything on the board every turn. Superfrag [BLAST] vs. infantry hordes. Superkrak for single high-value vehicle targets."
  },
  "Hellblaster Squad": {
    name: "Hellblaster Squad",
    role: "Fire Support Infantry",
    stats: { M: '6"', T: 4, Sv: "3+", W: 2, Ld: "6+", OC: 1, InvSv: "—" },
    abilities: [
      { name: "RELENTLESS", desc: "Each time a model in this unit makes an attack with a plasma incinerator, if the attack scores a Critical Hit, do not roll for the [HAZARDOUS] effect of that attack." },
    ],
    weapons: [
      { name: "Plasma incinerator (standard)", range: '30"', A: 2, ws: "3+", S: 7, AP: -2, D: 2, keywords: "" },
      { name: "Plasma incinerator (supercharge)", range: '30"', A: 2, ws: "3+", S: 8, AP: -3, D: 3, keywords: "[HAZARDOUS]" },
      { name: "Plasma pistol", range: '12"', A: 1, ws: "3+", S: 7, AP: -2, D: 1, keywords: "[PISTOL]" },
    ],
    keywords: ["INFANTRY", "ADEPTUS ASTARTES", "DARK ANGELS", "TACTICUS", "HELLBLASTERS"],
    notes: "10-model plasma wall. 20 shots at 30\". RELENTLESS: Critical Hits skip [HAZARDOUS] — fire supercharge freely. Azrael attached: [SUSTAINED HITS 1] on all weapons + 4++ invuln for the whole unit. DUTIFUL TENACITY detachment rule helps them survive return fire from high-Strength weapons."
  },
  "Inceptor Squad": {
    name: "Inceptor Squad",
    role: "Fast Attack — Jump Infantry",
    stats: { M: '10"', T: 5, Sv: "3+", W: 3, Ld: "6+", OC: 1, InvSv: "—" },
    abilities: [
      { name: "DEEP STRIKE", desc: "Can be set up in Reserves. Set up anywhere 9\"+ from all enemy models in your Reinforcement step." },
      { name: "DEATH FROM ABOVE", desc: "Each time this unit is set up using DEEP STRIKE, select one enemy unit within 9\": that unit suffers D3 mortal wounds." },
      { name: "DEVASTATING CHARGE", desc: "Each time this unit makes a charge move, until the end of the turn, add 1 to the Wound roll for melee attacks made by models in this unit." },
    ],
    weapons: [
      { name: "Plasma exterminators (standard)", range: '18"', A: 2, ws: "3+", S: 7, AP: -2, D: 1, keywords: "[PISTOL]" },
      { name: "Plasma exterminators (supercharge)", range: '18"', A: 2, ws: "3+", S: 8, AP: -3, D: 2, keywords: "[PISTOL], [HAZARDOUS]" },
      { name: "Close combat weapon", range: "Melee", A: 3, ws: "3+", S: 4, AP: 0, D: 1, keywords: "" },
    ],
    keywords: ["INFANTRY", "JUMP PACK", "FLY", "ADEPTUS ASTARTES", "DARK ANGELS", "INCEPTORS"],
    notes: "Deep Strike harassment. DEATH FROM ABOVE: D3 mortal wounds on arrival — free damage just by landing. Plasma exterminators are [PISTOL] so fire even in Engagement Range. DEVASTATING CHARGE: +1 Wound on melee after charging. Use to threaten backfield objectives and bait reactions."
  },
  "Inner Circle Companions": {
    name: "Inner Circle Companions",
    role: "Elite Melee Infantry",
    stats: { M: '6"', T: 4, Sv: "3+", W: 3, Ld: "6+", OC: 1, InvSv: "4+" },
    abilities: [
      { name: "BRAZIERS OF JUDGEMENT", desc: "While a CHARACTER model is leading this unit, each time an attack targets this unit, subtract 1 from the Hit roll." },
      { name: "ENMITY FOR THE UNWORTHY", desc: "Each time a model in this unit makes an attack that targets a CHARACTER unit, add 1 to the Hit roll." },
    ],
    weapons: [
      { name: "Heavy bolt pistol", range: '18"', A: 1, ws: "3+", S: 4, AP: -1, D: 1, keywords: "[PISTOL]" },
      { name: "Calibanite greatsword (strike)", range: "Melee", A: 5, ws: "3+", S: 6, AP: -2, D: 2, keywords: "[LETHAL HITS]" },
      { name: "Calibanite greatsword (sweep)", range: "Melee", A: 10, ws: "3+", S: 4, AP: -1, D: 1, keywords: "[SUSTAINED HITS 2]" },
    ],
    keywords: ["INFANTRY", "IMPERIUM", "DEATHWING", "TACTICUS", "INNER CIRCLE COMPANIONS"],
    notes: "Elite CHARACTER hunters with a 4++. BRAZIERS OF JUDGEMENT: -1 to Hit while led by a character — very hard to remove. ENMITY: +1 Hit vs. CHARACTER units (hits on 2+). Calibanite greatsword STRIKE for 2-damage killing, SWEEP for mass horde clearing. Judiciar attached = Fights First."
  },
  "Redemptor Dreadnought": {
    name: "Redemptor Dreadnought",
    role: "Walker — Heavy Support",
    stats: { M: '8"', T: 10, Sv: "2+", W: 12, Ld: "6+", OC: 4, InvSv: "—" },
    abilities: [
      { name: "DEADLY DEMISE D3", desc: "When destroyed, roll one D6 before removing. On a 6, each unit within 6\" suffers D3 mortal wounds." },
      { name: "DAMAGED: 1-4 WOUNDS REMAINING", desc: "While this model has 1-4 wounds remaining, subtract 1 from each Hit roll it makes." },
    ],
    weapons: [
      { name: "Macro plasma incinerator (standard)", range: '36"', A: "D6", ws: "3+", S: 8, AP: -3, D: 3, keywords: "[BLAST]" },
      { name: "Macro plasma incinerator (supercharge)", range: '36"', A: "D6", ws: "3+", S: 9, AP: -4, D: 4, keywords: "[BLAST], [HAZARDOUS]" },
      { name: "Onslaught gatling cannon", range: '30"', A: 12, ws: "3+", S: 6, AP: -1, D: 2, keywords: "" },
      { name: "Redemptor fist", range: "Melee", A: 5, ws: "3+", S: 12, AP: -3, D: 3, keywords: "" },
      { name: "Icarus rocket pod", range: '48"', A: 1, ws: "3+", S: 8, AP: -1, D: 2, keywords: "[ANTI-FLY 2+]" },
      { name: "Twin storm bolter", range: '24"', A: 4, ws: "3+", S: 4, AP: 0, D: 1, keywords: "[RAPID FIRE 4]" },
    ],
    keywords: ["VEHICLE", "WALKER", "ADEPTUS ASTARTES", "DARK ANGELS", "DREADNOUGHT", "REDEMPTOR DREADNOUGHT"],
    notes: "T10 2+ save 12W fire platform with OC 4. Onslaught gatling: 12 shots S6 AP-1 D2 shreds infantry. Macro plasma: D6 [BLAST] shots vs. vehicles/elites. Keep above 4W to maintain hit roll. OC 4 makes it a powerful objective contester — push it forward."
  },
  "Repulsor Executioner": {
    name: "Repulsor Executioner",
    role: "Vehicle — Heavy Tank",
    stats: { M: '10"', T: 12, Sv: "2+", W: 16, Ld: "6+", OC: 5, InvSv: "—" },
    abilities: [
      { name: "DEADLY DEMISE D6", desc: "When destroyed, roll D6 before removing. On a 6, each unit within 6\" suffers D6 mortal wounds." },
      { name: "DAMAGED: 1-5 WOUNDS REMAINING", desc: "While this model has 1-5 wounds remaining, subtract 2 from its Move and subtract 1 from Hit rolls." },
    ],
    weapons: [
      { name: "Heavy laser destroyer", range: '72"', A: 2, ws: "3+", S: 16, AP: -4, D: "D6+4", keywords: "[TWIN-LINKED]" },
      { name: "Heavy onslaught gatling cannon", range: '30"', A: 18, ws: "3+", S: 6, AP: -1, D: 2, keywords: "" },
      { name: "Icarus rocket pod", range: '48"', A: 1, ws: "3+", S: 8, AP: -1, D: 2, keywords: "[ANTI-FLY 2+]" },
      { name: "Twin Icarus ironhail heavy stubber", range: '48"', A: 3, ws: "3+", S: 5, AP: -1, D: 1, keywords: "[ANTI-FLY 4+]" },
      { name: "Twin heavy bolter", range: '36"', A: 6, ws: "3+", S: 5, AP: -1, D: 2, keywords: "[TWIN-LINKED]" },
    ],
    keywords: ["VEHICLE", "ADEPTUS ASTARTES", "DARK ANGELS", "DEATHWING", "REPULSOR", "REPULSOR EXECUTIONER"],
    notes: "T12 2+ 16W monster. Heavy laser destroyer: 2 shots S16 AP-4 D(D6+4) [TWIN-LINKED] — re-rolls hit 1s independently, kills anything. Heavy onslaught gatling: 18 shots S6 AP-1. OC 5 — park it on an objective and it's very hard to shift. Keep above 5W to maintain full stats. Has DEATHWING keyword."
  },
  "Scout Squad": {
    name: "Scout Squad",
    role: "Infiltrating Infantry",
    stats: { M: '6"', T: 4, Sv: "4+", W: 2, Ld: "6+", OC: 2, InvSv: "—" },
    abilities: [
      { name: "SCOUTS 6\"", desc: "Before the first battle round begins, this unit can make a Normal move of up to 6\". Cannot end within Engagement Range of any enemy models." },
      { name: "INFILTRATORS", desc: "During deployment, can be set up anywhere more than 9\" from the enemy deployment zone and all enemy models." },
      { name: "GUERRILLA TACTICS", desc: "Once per turn, when an enemy unit ends a Normal, Advance, or Fall Back move within 9\" of this unit, you can remove this unit from the battlefield. At the end of that phase, set it back up anywhere on the battlefield more than 9\" from all enemy models." },
    ],
    weapons: [
      { name: "Boltgun", range: '24"', A: 2, ws: "3+", S: 4, AP: 0, D: 1, keywords: "[RAPID FIRE 1]" },
      { name: "Bolt pistol", range: '12"', A: 1, ws: "3+", S: 4, AP: 0, D: 1, keywords: "[PISTOL]" },
      { name: "Close combat weapon", range: "Melee", A: 2, ws: "3+", S: 4, AP: 0, D: 1, keywords: "" },
    ],
    keywords: ["INFANTRY", "ADEPTUS ASTARTES", "DARK ANGELS", "SCOUTS", "SCOUT SQUAD"],
    notes: "INFILTRATORS: deploy 9\"+ from enemy deployment zone and all enemies — massive board control. SCOUTS 6\" pre-game move gets them even further forward. OC 2 despite 4+ save — excellent objective contesters. GUERRILLA TACTICS: teleport away when enemies come near — this unit is very difficult to pin down."
  },
};
const CHARACTERS = {
  "Lion El'Jonson": {
    fullName: "Lion El'Jonson",
    faction: "DARK ANGELS · PRIMARCH",
    role: "Warlord · SUPREME COMMANDER · Epic Hero · Monster",
    stats: { M: '8"', T: 9, Sv: "2+", W: 10, Ld: "5+", OC: 4, InvSv: "3+" },
    abilities: [
      { name: "DEEP STRIKE", desc: "Can be set up in Reserves. In your Reinforcement step, set up anywhere 9\"+ from all enemy models." },
      { name: "FIGHTS FIRST", desc: "This model fights in the Fights First step of the Fight phase, provided it is eligible to fight." },
      { name: "PRIMARCH OF THE FIRST LEGION", desc: "At the start of your Command phase, select two Primarch of the First Legion abilities. Until the start of your next Command phase, this model has those abilities. The three options are: MIST-WREATHED SHADOW REALMS — in your Command phase, if not in Engagement Range of enemies, you can return this unit to Strategic Reserves. MARTIAL EXEMPLAR (Aura) — while a friendly ADEPTUS ASTARTES unit is within 6\", each time a model in that unit makes a melee attack, re-roll a Hit roll of 1 and re-roll a Wound roll of 1. NO HIDING FROM THE WATCHERS (Aura) — while a friendly ADEPTUS ASTARTES unit is within 6\", models in that unit have Feel No Pain 4+ against mortal wounds." },
      { name: "THE EMPEROR'S SHIELD", desc: "Each time an attack is allocated to this model, if the Strength of that attack is greater than the Toughness of this model, subtract 1 from the Wound roll." },
      { name: "DARK ANGELS BODYGUARD", desc: "While this model is within 3\" of one or more friendly ADEPTUS ASTARTES INFANTRY units, this model has the Lone Operative ability." },
      { name: "SUPREME COMMANDER", desc: "If this model is in your army, it must be your Warlord." },
    ],
    weapons: [
      { name: "Arma Luminis — bolt", range: '12"', A: 4, ws: "2+", S: 4, AP: -1, D: 2, keywords: "[PISTOL]" },
      { name: "Arma Luminis — plasma", range: '12"', A: 2, ws: "2+", S: 8, AP: -3, D: 2, keywords: "[PISTOL]" },
      { name: "Fealty — strike", range: "Melee", A: 8, ws: "2+", S: 12, AP: -4, D: 4, keywords: "[LETHAL HITS]" },
      { name: "Fealty — sweep", range: "Melee", A: 16, ws: "2+", S: 6, AP: -3, D: 2, keywords: "[SUSTAINED HITS 1]" },
    ],
    keywords: ["MONSTER", "CHARACTER", "EPIC HERO", "IMPERIUM", "PRIMARCH", "LION EL'JONSON"],
    notes: "T9 with 3++ — extremely hard to kill. Fealty STRIKE (8A S12 AP-4 D4 [LETHAL HITS]) destroys vehicles and monsters. SWEEP (16A S6 AP-3 D2 [SUSTAINED HITS 1]) massacres hordes. PRIMARCH OF THE FIRST LEGION: pick 2 abilities each Command phase — typically MARTIAL EXEMPLAR (melee re-rolls for nearby units) and NO HIDING FROM THE WATCHERS (FNP 4+ vs. mortals). DARK ANGELS BODYGUARD: Lone Operative while near your own infantry — keep friendly INFANTRY models within 3\"."
  },
  "Azrael": {
    fullName: "Azrael",
    faction: "DARK ANGELS · SUPREME GRAND MASTER",
    role: "Character · Epic Hero · Chapter Master",
    stats: { M: '6"', T: 4, Sv: "2+", W: 6, Ld: "5+", OC: 1, InvSv: "4+" },
    abilities: [
      { name: "SUPREME GRAND MASTER", desc: "While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability." },
      { name: "MASTERFUL TACTICIAN", desc: "At the start of your Command phase, if this model is on the battlefield, you gain 1CP." },
      { name: "THE LION HELM", desc: "Models in the bearer's unit have a 4+ invulnerable save. In addition, once per battle, at any time, the bearer can summon a Watcher in the Dark. When it does, until the end of the phase, models in the bearer's unit have the Feel No Pain 4+ ability against mortal wounds." },
      { name: "LEADER", desc: "Can be attached to: Intercessor Squad, Hellblasters, Inner Circle Companions, and any unit a STERNGUARD VETERAN SQUAD leader can join." },
    ],
    weapons: [
      { name: "Lion's Wrath — bolt pistol mode", range: '12"', A: 3, ws: "2+", S: 4, AP: 0, D: 1, keywords: "[PISTOL]" },
      { name: "Lion's Wrath — plasma mode", range: '24"', A: 3, ws: "2+", S: 8, AP: -3, D: 3, keywords: "" },
      { name: "The Sword of Secrets", range: "Melee", A: 6, ws: "2+", S: 6, AP: -3, D: 3, keywords: "[LETHAL HITS]" },
    ],
    keywords: ["CHARACTER", "INFANTRY", "EPIC HERO", "GRENADES", "IMPERIUM", "DEATHWING", "TACTICUS", "CHAPTER MASTER", "AZRAEL"],
    notes: "CP engine: MASTERFUL TACTICIAN gives +1CP every Command phase — passive and reliable. SUPREME GRAND MASTER: the whole unit he leads gains [SUSTAINED HITS 1] — phenomenal with Hellblasters. THE LION HELM: 4++ for the unit always, plus once-per-game FNP 4+ vs. mortals when you need it most. Attach to Hellblasters for a devastating gun platform that's hard to remove."
  },
  "Judiciar": {
    fullName: "Judiciar",
    faction: "DARK ANGELS",
    role: "Character · Melee Support",
    stats: { M: '6"', T: 4, Sv: "3+", W: 4, Ld: "6+", OC: 1, InvSv: "4+" },
    abilities: [
      { name: "TEMPORMORTIS", desc: "While this model is leading a unit, that unit has the Fights First ability." },
      { name: "SILENT FURY", desc: "Each time this model destroys an enemy CHARACTER model, until the end of the battle, add 1 to the Attacks characteristic of its executioner relic blade." },
      { name: "LEADER", desc: "Can be attached to: Deathwing Knights, Inner Circle Companions, and any unit a STERNGUARD VETERAN SQUAD leader can join." },
    ],
    weapons: [
      { name: "Absolvor bolt pistol", range: '18"', A: 1, ws: "3+", S: 5, AP: -1, D: 2, keywords: "[PISTOL]" },
      { name: "Executioner relic blade", range: "Melee", A: 4, ws: "3+", S: 6, AP: -3, D: 3, keywords: "[DEVASTATING WOUNDS], [PRECISION]" },
    ],
    keywords: ["CHARACTER", "INFANTRY", "ADEPTUS ASTARTES", "DARK ANGELS", "DEATHWING", "JUDICIAR"],
    notes: "TEMPORMORTIS: the attached unit fights in the Fights First step — even when charged, they swing first. This makes Deathwing Knights or Inner Circle Companions almost impossible to charge into safely. SILENT FURY: each CHARACTER kill permanently adds 1A to the blade — stacks indefinitely. [PRECISION] on the blade lets him snipe enemy leaders in units."
  },
};
const GLOSSARY = {
  "[HEAVY]": { cat: "Keyword", def: "Add 1 to Hit rolls if the bearer did not make a Normal Move, Advance, or Fall Back this turn." },
  "[RAPID FIRE 1]": { cat: "Keyword", def: "If the target is within half the weapon's range, add 1 to the Attacks characteristic." },
  "[PISTOL]": { cat: "Keyword", def: "Can be used even if the bearer's unit is within Engagement Range. Can only be used if the unit didn't Advance." },
  "[HAZARDOUS]": { cat: "Keyword", def: "After shooting/fighting, roll one D6 per weapon. On a 1, the model suffers 3 mortal wounds (allocate to a CHARACTER first)." },
  "[LETHAL HITS]": { cat: "Keyword", def: "Critical Hits (unmodified 6 to hit) automatically wound — no wound roll needed." },
  "[SUSTAINED HITS 1]": { cat: "Keyword", def: "Each Critical Hit (unmodified 6 to hit) generates 1 additional hit." },
  "[SUSTAINED HITS 2]": { cat: "Keyword", def: "Each Critical Hit generates 2 additional hits." },
  "[DEVASTATING WOUNDS]": { cat: "Keyword", def: "Critical Wounds (unmodified 6 to wound) cause mortal wounds equal to the weapon's Damage. Bypasses saves entirely." },
  "[PRECISION]": { cat: "Keyword", def: "Critical Hits can be allocated to a CHARACTER in the target unit, even if not the closest model." },
  "[BLAST]": { cat: "Keyword", def: "Add 1 to Attacks for every 5 models in the target unit. Cannot target units within Engagement Range." },
  "[INDIRECT FIRE]": { cat: "Keyword", def: "Can target units without line of sight. Subtract 1 from Hit rolls when firing indirectly." },
  "[TWIN-LINKED]": { cat: "Keyword", def: "Each time an attack is made with this weapon, re-roll a Hit roll of 1." },
  "[ANTI-FLY 2+]": { cat: "Keyword", def: "Against FLY units, a Hit roll of 2+ is a Critical Hit." },
  "OATH OF MOMENT": { cat: "Army Rule", def: "At the start of your Command phase, select one enemy unit. ADEPTUS ASTARTES units re-roll Hit rolls of 1 against that unit for the rest of the battle round." },
  "DUTIFUL TENACITY": { cat: "Detachment Rule", def: "WRATH OF THE ROCK detachment rule. Each time an attack targets an ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES MOUNTED unit from your army, if the Strength of that attack is greater than the Toughness of that unit, subtract 1 from the Wound roll." },
  "DEEP STRIKE": { cat: "Ability", def: "Unit set up in Reserves. In your Reinforcement step, place anywhere 9\"+ from all enemy models." },
  "FIGHTS FIRST": { cat: "Ability", def: "This unit fights in the Fights First step of the Fight phase — before units without Fights First." },
  "INFILTRATORS": { cat: "Ability", def: "During deployment, set up anywhere more than 9\" from enemy deployment zone and all enemy models." },
  "SCOUTS 6\"": { cat: "Ability", def: "Before the first battle round begins, make a Normal move of up to 6\"." },
  "GUERRILLA TACTICS": { cat: "Ability (Scout Squad)", def: "Once per turn, when an enemy ends a move within 9\" of this unit, remove this unit. Redeploy it 9\"+ from all enemies at the end of that phase." },
  "LONE OPERATIVE": { cat: "Ability", def: "While fewer than 2 models, can only be targeted by ranged attacks if the attacking unit is within 12\"." },
  "PRIMARCH OF THE FIRST LEGION": { cat: "Ability (Lion El'Jonson)", def: "At the start of your Command phase, select TWO of these abilities until your next Command phase: MIST-WREATHED SHADOW REALMS (return to Strategic Reserves if not in Engagement Range), MARTIAL EXEMPLAR (Aura: re-roll Hit 1 and Wound 1 for ADEPTUS ASTARTES melee within 6\"), NO HIDING FROM THE WATCHERS (Aura: FNP 4+ vs mortal wounds for ADEPTUS ASTARTES within 6\")." },
  "THE EMPEROR'S SHIELD": { cat: "Ability (Lion El'Jonson)", def: "Each time an attack is allocated to Lion El'Jonson, if the Strength of that attack is greater than his Toughness (9), subtract 1 from the Wound roll. Weapons must be S10+ to trigger this." },
  "DARK ANGELS BODYGUARD": { cat: "Ability (Lion El'Jonson)", def: "While Lion El'Jonson is within 3\" of one or more friendly ADEPTUS ASTARTES INFANTRY units, he has the Lone Operative ability (only targetable at range if attacker is within 12\")." },
  "MARTIAL EXEMPLAR": { cat: "Ability (Lion El'Jonson)", def: "PRIMARCH OF THE FIRST LEGION option. Aura 6\": while a friendly ADEPTUS ASTARTES unit is within 6\", each time a model makes a melee attack, re-roll a Hit roll of 1 and re-roll a Wound roll of 1." },
  "NO HIDING FROM THE WATCHERS": { cat: "Ability (Lion El'Jonson)", def: "PRIMARCH OF THE FIRST LEGION option. Aura 6\": while a friendly ADEPTUS ASTARTES unit is within 6\", models in that unit have Feel No Pain 4+ against mortal wounds." },
  "MIST-WREATHED SHADOW REALMS": { cat: "Ability (Lion El'Jonson)", def: "PRIMARCH OF THE FIRST LEGION option. In your Command phase, if not in Engagement Range of enemies, you can remove Lion El'Jonson from the battlefield and place him into Strategic Reserves." },
  "SUPREME GRAND MASTER": { cat: "Ability (Azrael)", def: "While Azrael is leading a unit, all weapons in that unit gain [SUSTAINED HITS 1]." },
  "MASTERFUL TACTICIAN": { cat: "Ability (Azrael)", def: "+1CP at the start of your Command phase if Azrael is on the battlefield. Passive and reliable — never wastes." },
  "THE LION HELM": { cat: "Ability (Azrael)", def: "Models in Azrael's unit have a 4+ invulnerable save always. Once per battle, can give them FNP 4+ against mortal wounds for the rest of the phase." },
  "TEMPORMORTIS": { cat: "Ability (Judiciar)", def: "While the Judiciar is leading a unit, that unit has the Fights First ability — fights before enemies without Fights First even if charged." },
  "SILENT FURY": { cat: "Ability (Judiciar)", def: "Each time the Judiciar destroys an enemy CHARACTER model, permanently add 1 to the Attacks of his executioner relic blade for the rest of the battle." },
  "INNER CIRCLE": { cat: "Ability (Deathwing Knights)", def: "Each time an attack is allocated to a model in this unit, subtract 1 from the Damage characteristic of that attack (minimum 1). Combined with 2+ save and 4++, makes them very durable." },
  "TELEPORT HOMER": { cat: "Ability (Deathwing Knights)", def: "At the start of battle, place a Teleport Homer token anywhere outside the opponent's deployment zone. Once per battle, use Rapid Ingress on this unit for 0CP — must land within 3\" of the token and 9\"+ from enemies." },
  "BRAZIERS OF JUDGEMENT": { cat: "Ability (Inner Circle Companions)", def: "While a CHARACTER leads this unit, each time an attack targets this unit, subtract 1 from the Hit roll. Makes them very hard to remove with ranged fire." },
  "ENMITY FOR THE UNWORTHY": { cat: "Ability (Inner Circle Companions)", def: "Each time a model in this unit makes an attack targeting a CHARACTER unit, add 1 to the Hit roll (hit on 2+)." },
  "DEATH FROM ABOVE": { cat: "Ability (Inceptors)", def: "When set up via DEEP STRIKE, select one enemy unit within 9\": that unit suffers D3 mortal wounds." },
  "DEVASTATING CHARGE": { cat: "Ability (Inceptors)", def: "Each time this unit makes a charge move, add 1 to Wound rolls for melee attacks until end of turn." },
  "RELENTLESS": { cat: "Ability (Hellblasters)", def: "Each time a model makes an attack with a plasma incinerator and scores a Critical Hit, do not roll for [HAZARDOUS] for that attack." },
  "ARMOUR OF CONTEMPT": { cat: "Stratagem — 1CP", def: "WRATH OF THE ROCK. Opponent's Shooting or Fight phase. One ADEPTUS ASTARTES unit: worsen AP of all incoming attacks by 1 until end of phase." },
  "LION'S WILL": { cat: "Stratagem — 1CP", def: "WRATH OF THE ROCK. Command phase. One ADEPTUS ASTARTES unit in Engagement Range: until your next Command phase, +1 OC. If NOT DEATHWING, RAVENWING, or VEHICLE, also +1 to Hit rolls." },
  "TACTICAL MASTERY": { cat: "Stratagem — 1CP", def: "WRATH OF THE ROCK. Movement phase. One ADEPTUS ASTARTES unit: can shoot and charge in a turn it Advanced. If RAVENWING, can also Fall Back then shoot and charge." },
  "RELICS OF THE DARK AGE": { cat: "Stratagem — 1CP", def: "WRATH OF THE ROCK. Shooting phase. One ADEPTUS ASTARTES INFANTRY or MOUNTED unit: +2 to the Strength of all ranged weapons until end of phase. S10 Hellblasters, S11 Inceptors — devastating." },
  "LEONINE AGGRESSION": { cat: "Stratagem — 1CP", def: "WRATH OF THE ROCK. End of opponent's Charge phase. One ADEPTUS ASTARTES unit within 3\" (or 6\" if DEATHWING) of one or more enemy units: can charge that enemy unit. Does not grant Fights First." },
  "INESCAPABLE JUSTICE": { cat: "Stratagem — 2CP", def: "WRATH OF THE ROCK. Any phase, just after your Oath of Moment target is destroyed. One ADEPTUS ASTARTES CHARACTER unit on the battlefield: select a new Oath of Moment target within 12\" visible to that character." },
  "COUNTER-OFFENSIVE": { cat: "Stratagem — 2CP (Core)", def: "After an enemy unit finishes fighting, immediately select one of your units in Engagement Range — that unit fights next." },
  "FIRE OVERWATCH": { cat: "Stratagem — 1CP (Core)", def: "When an enemy unit moves or is set up within 24\" of one of your units: shoot at that unit as if it were your Shooting phase." },
  "GO TO GROUND": { cat: "Stratagem — 1CP (Core)", def: "One of your INFANTRY units being targeted: gains 6++ invuln + BENEFIT OF COVER until end of phase." },
  "RAPID INGRESS": { cat: "Stratagem — 1CP (Core)", def: "End of opponent's Movement phase. One unit in Reserves: set up anywhere 9\"+ from enemies." },
  "HEROIC INTERVENTION": { cat: "Stratagem — 1CP (Core)", def: "After all enemy charges. One CHARACTER unit within 3\" of an enemy: move up to 3\" so it is in Engagement Range." },
  "BATTLE-SHOCKED": { cat: "Game State", def: "Failed Battle-shock test: OC drops to 0, controlling player cannot use Stratagems on it. Until start of your next Command phase." },
  "MORTAL WOUNDS": { cat: "Rule", def: "Each mortal wound inflicts 1 point of damage directly, bypassing hit rolls, wound rolls, and saving throws." },
  "OBJECTIVE CONTROL (OC)": { cat: "Rule", def: "Each model has an OC value. The player with greater total OC on an objective controls it. Battle-shocked units have OC 0." },
  "ENGAGEMENT RANGE": { cat: "Rule", def: "Within 1\" horizontally and 5\" vertically of an enemy model." },
  "COMMAND POINT (CP)": { cat: "Rule", def: "Both players gain 1CP per Command phase. Azrael's MASTERFUL TACTICIAN gives +1CP additionally when he's on the battlefield." },
};
const CAT_COLORS = {
  "Army Rule": "#10b981",
  "Detachment Rule": "#22d3ee",
  "Keyword": "#3b82f6",
  "Ability": "#a855f7",
  "Ability (Lion El'Jonson)": "#f59e0b",
  "Ability (Azrael)": "#34d399",
  "Ability (Judiciar)": "#60a5fa",
  "Ability (Deathwing Knights)": "#f97316",
  "Ability (Inner Circle Companions)": "#e879f9",
  "Ability (Inceptors)": "#f97316",
  "Ability (Hellblasters)": "#f87171",
  "Ability (Scout Squad)": "#94a3b8",
  "Stratagem — 1CP": "#f59e0b",
  "Stratagem — 1CP (Core)": "#d97706",
  "Stratagem — 2CP": "#f97316",
  "Stratagem — 2CP (Core)": "#ef4444",
  "Game State": "#ef4444",
  "Rule": "#6b7280",
};
const CHAR_ALIASES = {
  "Lion El'Jonson": ["Lion El'Jonson", "the Lion", "Lion"],
  "Azrael": ["Azrael"],
  "Judiciar": ["Judiciar"],
};
const UNIT_ALIASES = {
  "Intercessor Squad": ["Intercessor Squad", "Intercessors"],
  "Deathwing Knights": ["Deathwing Knights", "Deathwing"],
  "Desolation Squad": ["Desolation Squad", "Desolation Marines", "Desolators"],
  "Hellblaster Squad": ["Hellblaster Squad", "Hellblasters"],
  "Inceptor Squad": ["Inceptor Squad", "Inceptors"],
  "Inner Circle Companions": ["Inner Circle Companions", "Inner Circle"],
  "Redemptor Dreadnought": ["Redemptor Dreadnought", "Redemptor", "Dreadnought"],
  "Repulsor Executioner": ["Repulsor Executioner", "Repulsor"],
  "Scout Squad": ["Scout Squad", "Scouts"],
};
const ROSTER = [
  { unit: "Lion El'Jonson", role: "Warlord", pts: 315, notes: "SUPREME COMMANDER. M8\" T9 3++. Fealty STRIKE: 8A S12 AP-4 D4. PRIMARCH abilities selected each turn. Does NOT attach to units — standalone MONSTER." },
  { unit: "Azrael", role: "Character", pts: 125, notes: "+1CP per Command phase. Unit gets [SUSTAINED HITS 1]. 4++ invuln for unit. Attach to Hellblasters." },
  { unit: "Judiciar", role: "Character", pts: 70, notes: "Unit gets Fights First. [PRECISION] blade. Attach to Deathwing Knights for Fights First on Deep Strike." },
  { unit: "Intercessor Squad", role: "Battleline", pts: 80, notes: "5 models. OC 2. Bolt rifles 30\" [HEAVY] [RAPID FIRE 1]. Home/mid objective anchor." },
  { unit: "Deathwing Knights", role: "Elite", pts: 250, notes: "5 models. Deep Strike. INNER CIRCLE: -1 Damage to all attacks. TELEPORT HOMER: 0CP Rapid Ingress once. Judiciar attaches." },
  { unit: "Desolation Squad", role: "Fire Support", pts: 200, notes: "5 models. ALL weapons [INDIRECT FIRE]. Static all game — never move. Superkrak for vehicles." },
  { unit: "Hellblaster Squad", role: "Fire Support", pts: 220, notes: "10 models. Azrael attaches. 20 plasma shots at 30\". RELENTLESS: Crits skip [HAZARDOUS]." },
  { unit: "Inceptor Squad", role: "Fast Attack", pts: 120, notes: "3 models. Deep Strike. D3 mortal wounds on arrival. Plasma exterminators [PISTOL]. DEVASTATING CHARGE." },
  { unit: "Inner Circle Companions", role: "Elite", pts: 90, notes: "3 models. 4++. BRAZIERS: -1 to Hit while led. ENMITY: +1 Hit vs CHARACTERs. Judiciar or Lion leads." },
  { unit: "Redemptor Dreadnought", role: "Heavy Support", pts: 205, notes: "T10 12W OC4. Onslaught gatling 12 shots. Macro plasma D6 [BLAST]." },
  { unit: "Repulsor Executioner", role: "Heavy Support", pts: 230, notes: "T12 16W OC5. Heavy laser destroyer S16 [TWIN-LINKED]. 18 shots gatling. DEATHWING keyword." },
  { unit: "Scout Squad", role: "Infiltrator", pts: 70, notes: "INFILTRATORS + SCOUTS 6\" pre-game. GUERRILLA TACTICS: teleport when enemies come close. OC 2." },
];
const STRATAGEMS = [
  { n: "Masterful Tactician (Azrael)", c: 0, phase: "Command", desc: "NOT a stratagem — passive ability. Azrael on battlefield = +1CP at start of your Command phase. Always active." },
  { n: "Armour of Contempt", c: 1, phase: "Opp Shoot/Fight", desc: "One ADEPTUS ASTARTES unit: worsen AP of all incoming attacks by 1 until end of phase." },
  { n: "Lion's Will", c: 1, phase: "Command", desc: "One ADEPTUS ASTARTES unit in Engagement Range: +1 OC. If not DEATHWING/RAVENWING/VEHICLE: also +1 to Hit." },
  { n: "Tactical Mastery", c: 1, phase: "Movement", desc: "One ADEPTUS ASTARTES unit: can shoot and charge after Advancing. RAVENWING: also Fall Back then shoot and charge." },
  { n: "Relics of the Dark Age", c: 1, phase: "Shooting", desc: "One ADEPTUS ASTARTES INFANTRY/MOUNTED unit: +2 Strength to all ranged weapons until end of phase." },
  { n: "Leonine Aggression", c: 1, phase: "Opp Charge (end)", desc: "One ADEPTUS ASTARTES unit within 3\" (or 6\" if DEATHWING) of enemies at end of opponent's charge phase: can charge. No Fights First." },
  { n: "Heroic Intervention", c: 1, phase: "Opp Charge", desc: "One CHARACTER unit within 3\" of enemies: move up to 3\" to get into Engagement Range." },
  { n: "Fire Overwatch", c: 1, phase: "Opp Charge/Move", desc: "One of your units shoots at an enemy unit that moves or sets up within 24\" of it." },
  { n: "Go to Ground", c: 1, phase: "Opp Shooting", desc: "One INFANTRY unit being targeted: 6++ invuln + BENEFIT OF COVER until end of phase." },
  { n: "Rapid Ingress", c: 1, phase: "Opp Movement", desc: "One Reserve unit: deploy anywhere 9\"+ from enemies during opponent's Reinforcement step. FREE for Deathwing Knights via Teleport Homer (once)." },
  { n: "Inescapable Justice", c: 2, phase: "Any (after Oath kill)", desc: "After your Oath target is destroyed: pick a new Oath target within 12\" of one of your ADEPTUS ASTARTES CHARACTERs." },
  { n: "Counter-Offensive", c: 2, phase: "Fight", desc: "CORE. After enemy unit finishes fighting: immediately fight back with one of your units in Engagement Range." },
];
const PHASES = ["command", "movement", "shooting", "charge", "fight", "end", "reactive"];
const PHASE_LABELS = { command: "Command Phase", movement: "Movement Phase", shooting: "Shooting Phase", charge: "Charge Phase", fight: "Fight Phase", end: "End of Round", reactive: "Opponent's Turn" };
const PHASE_COLORS = { command: "#065f46", movement: "#1e3a5f", shooting: "#7c2d12", charge: "#831843", fight: "#7c2d12", end: "#064e3b", reactive: "#1a1a2e" };
const PHASE_ICONS = { command: "⚙️", movement: "🏃", shooting: "🎯", charge: "⚔️", fight: "🗡️", end: "🏆", reactive: "🛡️" };
const DEPLOYMENT = {
  first: [
    "OATH OF MOMENT: select your primary target — the biggest threat or hardest-to-kill unit. All ADEPTUS ASTARTES re-roll Hit 1s against it.",
    "PLACE TELEPORT HOMER: set it on or near the mid-board objective you plan to contest Turn 2. Not in opponent's deployment zone.",
    "SET RESERVES: Deathwing Knights + Judiciar and Inceptor Squad go into Deep Strike reserves.",
    "DEPLOY Scout Squad: use INFILTRATORS to place them 9\"+ from enemies on a forward objective. They will SCOUTS 6\" pre-game to push even further.",
    "DEPLOY Intercessor Squad: on your home objective. OC 2 holds it all game. Don't move them.",
    "DEPLOY Hellblaster Squad + Azrael: central position with 30\" sight lines to mid-board. They are your main gun line.",
    "DEPLOY Desolation Squad: back field in cover. All weapons are [INDIRECT FIRE] — they never need line of sight. Never move them.",
    "DEPLOY Redemptor Dreadnought: mid-field push position. OC 4 will contest objectives. Onslaught gatling covers infantry approach.",
    "DEPLOY Repulsor Executioner: firing lane with 72\" heavy laser destroyer reach. OC 5 can anchor an objective.",
    "DEPLOY Inner Circle Companions: ready to advance toward mid-board or screen for Lion El'Jonson.",
    "DEPLOY Lion El'Jonson: near friendly INFANTRY for DARK ANGELS BODYGUARD (Lone Operative). Select PRIMARCH abilities Turn 1.",
    "SCOUTS 6\" (Scout Squad): after all deployment, move Scouts 6\" forward to contest or screen.",
    "Going first — push aggressively. Redemptor and Repulsor advance. Deathwing Knights Deep Strike Turn 2.",
  ],
  second: [
    "OATH OF MOMENT: select the enemy unit most likely to threaten your key positions Turn 1.",
    "PLACE TELEPORT HOMER: position it conservatively — you'll see their deployment first. Place near a safe mid-board position.",
    "SET RESERVES: Deathwing Knights + Judiciar and Inceptor Squad into Deep Strike reserves.",
    "DEPLOY Scout Squad: use INFILTRATORS more cautiously — they'll be shot at before you act. Place with escape routes for GUERRILLA TACTICS.",
    "DEPLOY Intercessor Squad: on your home objective. Don't move them.",
    "DEPLOY Hellblaster Squad + Azrael: slightly further back — they shoot on YOUR Turn 1 after seeing the opponent's move.",
    "DEPLOY Desolation Squad: back field in cover. [INDIRECT FIRE] doesn't need sight lines.",
    "DEPLOY Redemptor Dreadnought: hold back slightly — push forward on YOUR Turn 1 after seeing threats.",
    "DEPLOY Repulsor Executioner: safe firing position with long sight lines. 72\" heavy laser destroyer reaches everything.",
    "DEPLOY Inner Circle Companions: protected position — advance on YOUR Turn 1.",
    "DEPLOY Lion El'Jonson: near INFANTRY for Lone Operative protection. Don't over-expose him before you act.",
    "SCOUTS 6\" (Scout Squad): move cautiously — opponent shoots before you.",
    "Going second — play reactively. Your Turn 1 comes AFTER their full turn. Use FIRE OVERWATCH and ARMOUR OF CONTEMPT to survive.",
  ],
};
const mkChecklist = (goingFirst) => (round) => {
  const reactive = [
    "OPPONENT'S MOVEMENT: RAPID INGRESS (1CP) — drop a Reserve unit 9\"+ anywhere on the board",
    "OPPONENT'S SHOOTING: ARMOUR OF CONTEMPT (1CP) — worsen AP of all incoming attacks by 1 on one ADEPTUS ASTARTES unit",
    "OPPONENT'S SHOOTING: GO TO GROUND (1CP) — give a threatened INFANTRY unit 6++ invuln + BENEFIT OF COVER",
    "OPPONENT'S CHARGE: FIRE OVERWATCH (1CP) — shoot at a charging unit before it reaches you",
    "OPPONENT'S CHARGE: LEONINE AGGRESSION (1CP) — counter-charge with an ADEPTUS ASTARTES unit within 3\" (6\" if DEATHWING)",
    "OPPONENT'S CHARGE: HEROIC INTERVENTION (1CP) — CHARACTER within 3\" of enemies moves into Engagement Range",
    "OPPONENT'S FIGHT: COUNTER-OFFENSIVE (2CP) — after an enemy unit fights, immediately fight back",
    round === 0 ? "→ Opponent's Turn 1 done. Press the button below to start YOUR Turn 1." : "→ Opponent's turn done. Press 'Next Round' to start your Command Phase.",
  ];
  return {
    command: [
      "OATH OF MOMENT (MANDATORY): select one enemy unit — all ADEPTUS ASTARTES re-roll Hit 1s against it this round",
      "PRIMARCH OF THE FIRST LEGION (Lion El'Jonson — MANDATORY): select TWO abilities — typically MARTIAL EXEMPLAR + NO HIDING FROM THE WATCHERS",
      "MASTERFUL TACTICIAN (Azrael): if Azrael is on the battlefield, gain +1CP now",
      "Both players gain 1CP — track your total",
      "BATTLE-SHOCK STEP: any units below half-strength? Roll 2D6 vs Leadership. Fail = BATTLE-SHOCKED (OC 0, no Stratagems)",
      "DUTIFUL TENACITY (Detachment Rule): remember — incoming attacks with S > T of your INFANTRY/MOUNTED subtract 1 from Wound rolls",
    ],
    movement: round === 1 ? [
      "SCOUTS 6\" already happened pre-game — Scout Squad is pre-positioned",
      "Push Redemptor Dreadnought toward mid-board objective — OC 4 contests strongly",
      "Advance Repulsor Executioner into firing position — 72\" heavy laser destroyer reaches everything",
      "Hellblaster Squad + Azrael: hold position if they have good sight lines. Bolt rifles are [HEAVY] — don't move if you want +1 to Hit",
      "No Deep Strike arrivals Turn 1 — save Deathwing Knights + Judiciar and Inceptors for Turn 2",
      "Lion El'Jonson: keep within 3\" of friendly INFANTRY for DARK ANGELS BODYGUARD (Lone Operative)",
      "Inner Circle Companions: advance toward mid-board or screen for the Lion",
    ] : [
      round === 2 ? "Turn 2 Priority: DEEP STRIKE Deathwing Knights + Judiciar — land 9\"+ from prime target. TELEPORT HOMER for 0CP Rapid Ingress option." : "Late game — prioritise objectives over aggression. Use OC to win the scoring game.",
      round === 2 ? "DEEP STRIKE Inceptor Squad — DEATH FROM ABOVE deals D3 mortal wounds on landing. Target backfield threats." : "Reposition Inceptors to contest objectives or harass backfield.",
      "Push Redemptor Dreadnought onto contested objectives — OC 4 is massive",
      "Lion El'Jonson: MIST-WREATHED SHADOW REALMS can return him to Strategic Reserves if needed for repositioning",
      "Hellblaster Squad + Azrael: maintain firing position. Don't Advance unless absolutely necessary — [HEAVY] bonus matters.",
      "Scout Squad: use GUERRILLA TACTICS to teleport away if enemies approach, then redeploy onto uncontested objectives",
    ],
    shooting: [
      "OATH OF MOMENT target: all ADEPTUS ASTARTES re-roll Hit 1s against it — focus fire",
      "Hellblaster Squad + Azrael: 20 plasma shots with [SUSTAINED HITS 1] from SUPREME GRAND MASTER. Supercharge freely — RELENTLESS skips [HAZARDOUS] on Crits.",
      "RELICS OF THE DARK AGE (1CP): +2 Strength to one INFANTRY unit's ranged weapons. S10 Hellblasters or S9 Inceptors — devastating.",
      "Desolation Squad: [INDIRECT FIRE] hits anything on the board. Superfrag [BLAST] vs. hordes, Superkrak vs. vehicles.",
      "Redemptor Dreadnought: Onslaught gatling (12 shots S6) shreds infantry. Macro plasma vs. elites/vehicles.",
      "Repulsor Executioner: Heavy laser destroyer (S16 [TWIN-LINKED]) kills anything. Heavy onslaught gatling (18 shots) for infantry.",
      round >= 2 ? "Inceptors arrived? Plasma exterminators are [PISTOL] — fire even in Engagement Range." : "Inceptors still in reserve — they arrive Turn 2.",
    ],
    charge: [
      "Lion El'Jonson: FIGHTS FIRST built-in. Charge fearlessly — he strikes before enemies without Fights First.",
      round === 1 ? "Turn 1: Inner Circle Companions are your main chargers if in range. Deathwing Knights arrive Turn 2." : "Deathwing Knights + Judiciar arrived? Charge now — TEMPORMORTIS gives FIGHTS FIRST to the whole unit.",
      "Inceptors: DEVASTATING CHARGE gives +1 to Wound rolls on melee after charging. Charge after shooting [PISTOL] weapons.",
      "Redemptor Dreadnought: Redemptor fist (S12 AP-3 D3) destroys vehicles in melee. Charge if beneficial.",
      "Never charge Desolation Squad — keep them static and shooting [INDIRECT FIRE] every turn.",
    ],
    fight: [
      "FIGHTS FIRST units go first: Lion El'Jonson always. Deathwing Knights + Judiciar if attached.",
      "Lion El'Jonson — Fealty STRIKE (8A S12 AP-4 D4 [LETHAL HITS]) vs. vehicles/monsters. SWEEP (16A S6 AP-3 D2 [SUSTAINED HITS 1]) vs. hordes.",
      "MARTIAL EXEMPLAR (if selected): friendly ADEPTUS ASTARTES within 6\" re-roll Hit 1 and Wound 1 in melee.",
      "Deathwing Knights: Mace STRIKE (S8 AP-2 D2) vs. elites. SWEEP (S5 AP-1 D1 x8 attacks) vs. hordes. Knight Master has [DEVASTATING WOUNDS].",
      "Inner Circle Companions: ENMITY FOR THE UNWORTHY — +1 Hit vs. CHARACTER units (hits on 2+). Greatsword STRIKE for killing, SWEEP for clearing.",
      "Judiciar: [PRECISION] on executioner relic blade — snipe enemy CHARACTERs. SILENT FURY: +1A permanently per CHARACTER kill.",
      "COUNTER-OPERATIVE (2CP): fight back immediately after an enemy unit finishes fighting.",
    ],
    end: [
      "Score primary VP — check OC on each objective. BATTLE-SHOCKED units have OC 0.",
      "Azrael's unit holds an objective? OC 1 per model + Azrael. Redemptor (OC 4) and Repulsor (OC 5) are massive contesters.",
      "Intercessor Squad (OC 2): are they still holding home objective?",
      "Scout Squad: GUERRILLA TACTICS available? Position for next turn's objective grab.",
      round === 1 ? "Turn 1 end: plan Deathwing Knights + Inceptor Deep Strike positions for Turn 2." : "Check CP total — Azrael gives +1CP per Command phase. Spend aggressively in late game.",
      "→ Your turn is done. Now watch for reactive plays during the opponent's turn.",
    ],
    reactive,
  };
};
const mkActivationOrder = (round) => {
  const reactive = [
    "1. RAPID INGRESS (1CP) — use in opponent's Movement to drop reserves 9\"+ anywhere",
    "2. ARMOUR OF CONTEMPT (1CP) — opponent's Shooting/Fight, worsen AP on a key unit",
    "3. GO TO GROUND (1CP) — opponent's Shooting, give threatened INFANTRY 6++ + cover",
    "4. FIRE OVERWATCH (1CP) — opponent's Charge, shoot at the charging unit",
    "5. LEONINE AGGRESSION (1CP) — end of opponent's Charge, counter-charge with your unit",
    "6. HEROIC INTERVENTION (1CP) — CHARACTER moves 3\" into Engagement Range",
    "7. COUNTER-OPERATIVE (2CP) — opponent's Fight, fight back immediately",
  ];
  return {
    command: [
      "1. OATH OF MOMENT (MANDATORY): select one enemy unit for re-roll Hit 1s",
      "2. PRIMARCH OF THE FIRST LEGION (Lion El'Jonson): select TWO abilities",
      "3. MASTERFUL TACTICIAN (Azrael): gain +1CP if on battlefield",
      "4. Both players gain 1CP",
      "5. BATTLE-SHOCK STEP: check all units below half-strength",
      round === 1 ? "6. Plan Turn 1 — push vehicles forward, hold gun line steady" : round === 2 ? "6. Plan Deep Strike — where do Deathwing Knights and Inceptors land?" : "6. Late game — prioritise objectives over aggression",
    ],
    movement: round === 1 ? [
      "1. SCOUTS 6\" already happened pre-game — Scout Squad is positioned",
      "2. Push Redemptor Dreadnought toward mid-board objective (OC 4)",
      "3. Advance Repulsor Executioner into firing position",
      "4. Hold Hellblaster Squad + Azrael in position (don't move — [HEAVY] bonus)",
      "5. Advance Inner Circle Companions toward mid-board",
      "6. Position Lion El'Jonson within 3\" of INFANTRY for Lone Operative",
    ] : round === 2 ? [
      "1. DEEP STRIKE Deathwing Knights + Judiciar — 9\"+ from target (or use TELEPORT HOMER for 0CP)",
      "2. DEEP STRIKE Inceptor Squad — DEATH FROM ABOVE: D3 mortal wounds on landing",
      "3. Push Redemptor Dreadnought onto contested objective",
      "4. Hold Hellblaster Squad + Azrael in firing position",
      "5. Advance Inner Circle Companions toward combat",
      "6. Lion El'Jonson: advance toward melee range or use MIST-WREATHED to reposition",
    ] : [
      "1. Move Lion El'Jonson toward contested objectives — T9 3++ is nearly unkillable",
      "2. Push Redemptor (OC 4) and Repulsor (OC 5) onto objectives",
      "3. Reposition Inceptors to contest backfield objectives",
      "4. Scout Squad: GUERRILLA TACTICS if enemies approach, redeploy onto objectives",
      "5. Hold Hellblaster Squad + Azrael in position if possible",
    ],
    shooting: [
      "1. Hellblaster Squad + Azrael — 20 plasma shots with [SUSTAINED HITS 1]. Supercharge freely.",
      "2. RELICS OF THE DARK AGE (1CP) on Hellblasters for S10 or Inceptors for S9",
      "3. Desolation Squad — [INDIRECT FIRE] vs. priority target. Superkrak vs. vehicles.",
      "4. Redemptor Dreadnought — Onslaught gatling (12 shots) vs. infantry, Macro plasma vs. elites",
      "5. Repulsor Executioner — Heavy laser destroyer vs. biggest target, gatling vs. infantry",
      round >= 2 ? "6. Inceptors — plasma exterminators [PISTOL], fire even in Engagement Range" : "6. Inceptors still in reserve",
    ],
    charge: [
      "1. Lion El'Jonson — FIGHTS FIRST built-in, charge fearlessly",
      round >= 2 ? "2. Deathwing Knights + Judiciar — charge after Deep Strike. TEMPORMORTIS = Fights First." : "2. Deathwing Knights still in reserve — arrive Turn 2",
      "3. Inner Circle Companions — charge CHARACTERs for ENMITY (+1 Hit)",
      round >= 2 ? "4. Inceptors — DEVASTATING CHARGE: +1 Wound on melee after charging" : "4. Inceptors still in reserve",
      "5. Redemptor Dreadnought — Redemptor fist (S12) if beneficial",
    ],
    fight: [
      "1. FIGHTS FIRST: Lion El'Jonson always strikes first. Deathwing Knights + Judiciar if attached.",
      "2. Lion El'Jonson — STRIKE vs. vehicles/monsters, SWEEP vs. hordes. MARTIAL EXEMPLAR re-rolls if active.",
      "3. Deathwing Knights — Mace STRIKE vs. elites, SWEEP vs. hordes. Knight Master [DEVASTATING WOUNDS].",
      "4. Inner Circle Companions — ENMITY +1 Hit vs. CHARACTERs. Judiciar [PRECISION] snipes leaders.",
      "5. COUNTER-OPERATIVE (2CP) if a critical unit gets charged",
    ],
    end: [
      "1. Score all objectives — check OC on each marker",
      "2. Redemptor (OC 4) and Repulsor (OC 5) are your biggest objective contesters",
      "3. Intercessor Squad (OC 2): still holding home objective?",
      round === 1 ? "4. Plan Turn 2 Deep Strike — Deathwing Knights near TELEPORT HOMER, Inceptors to backfield" : "4. Check CP — Azrael gives +1CP per Command phase. Spend aggressively late game.",
    ],
    reactive,
  };
};
const PHASE_REFERENCE = {
  command: [
    "OATH OF MOMENT: select one enemy unit — re-roll Hit 1s for ALL ADEPTUS ASTARTES against it.",
    "PRIMARCH OF THE FIRST LEGION: select TWO abilities for Lion El'Jonson. Typically MARTIAL EXEMPLAR + NO HIDING FROM THE WATCHERS.",
    "MASTERFUL TACTICIAN (Azrael): +1CP if on the battlefield. Passive — always triggers.",
    "BATTLE-SHOCK STEP: units Below Half-Strength roll 2D6 vs Ld. Fail = BATTLE-SHOCKED.",
    "CP Priority: RELICS OF THE DARK AGE > ARMOUR OF CONTEMPT > TACTICAL MASTERY > LEONINE AGGRESSION > INESCAPABLE JUSTICE.",
  ],
  movement: [
    "Bolt rifles are [HEAVY]: don't move Intercessors if you want +1 to Hit.",
    "DEEP STRIKE: place 9\"+ from enemies. RAPID INGRESS (1CP) arrives in opponent's Reinforcement step.",
    "TELEPORT HOMER: Deathwing Knights can use Rapid Ingress for 0CP once per battle — land within 3\" of the token.",
    "TACTICAL MASTERY (1CP): one unit can shoot and charge after Advancing.",
    "Lion El'Jonson: MIST-WREATHED SHADOW REALMS can return him to Strategic Reserves for repositioning.",
    "Scout Squad: INFILTRATORS + SCOUTS 6\" for forward deployment. GUERRILLA TACTICS to escape when enemies approach.",
  ],
  shooting: [
    "OATH OF MOMENT: re-roll Hit 1s against the selected target with all ADEPTUS ASTARTES.",
    "Azrael's unit gets [SUSTAINED HITS 1] — phenomenal on Hellblasters' 20 plasma shots.",
    "RELICS OF THE DARK AGE (1CP): +2 Strength to one INFANTRY unit's ranged weapons.",
    "Desolation Squad: [INDIRECT FIRE] — no line of sight needed. Superfrag [BLAST] vs. hordes, Superkrak vs. vehicles.",
    "RELENTLESS (Hellblasters): Critical Hits skip [HAZARDOUS] — always supercharge.",
    "Repulsor Executioner: Heavy laser destroyer S16 [TWIN-LINKED] kills anything at 72\".",
  ],
  charge: [
    "Lion El'Jonson has FIGHTS FIRST built-in — charge without fear.",
    "Deathwing Knights + Judiciar: TEMPORMORTIS gives the whole unit Fights First.",
    "Inceptors: DEVASTATING CHARGE gives +1 to Wound rolls on melee after charging.",
    "LEONINE AGGRESSION (1CP): counter-charge at end of opponent's Charge phase. 6\" range if DEATHWING.",
  ],
  fight: [
    "FIGHTS FIRST: Lion El'Jonson always. Deathwing Knights + Judiciar if attached.",
    "MARTIAL EXEMPLAR (if active): re-roll Hit 1 and Wound 1 for ADEPTUS ASTARTES melee within 6\" of the Lion.",
    "Fealty STRIKE (8A S12 AP-4 D4 [LETHAL HITS]) vs. vehicles/monsters. SWEEP (16A S6 AP-3 D2) vs. hordes.",
    "INNER CIRCLE: -1 Damage to all attacks against Deathwing Knights. Combined with 2+ save and 4++.",
    "Inner Circle Companions: ENMITY FOR THE UNWORTHY — +1 Hit vs. CHARACTERs (hit on 2+).",
    "Judiciar: [PRECISION] snipes CHARACTERs. SILENT FURY: permanent +1A per CHARACTER kill.",
    "COUNTER-OPERATIVE (2CP): fight back after an enemy unit finishes fighting.",
  ],
  end: [
    "Score Primary VP: OC > opponent on objective.",
    "Key OC values: Repulsor Executioner (5), Redemptor Dreadnought (4), Lion El'Jonson (4), Intercessors (2 per model), Scouts (2 per model).",
    "DUTIFUL TENACITY: remember this detachment rule reduces incoming wounds from high-S weapons on INFANTRY/MOUNTED.",
    "THE LION HELM (Azrael): once per battle, FNP 4+ vs. mortal wounds for the whole unit. Save for a critical moment.",
  ],
  reactive: [
    "RAPID INGRESS (1CP): drop Reserve unit 9\"+ during opponent's Movement. FREE for Deathwing Knights via TELEPORT HOMER (once).",
    "ARMOUR OF CONTEMPT (1CP): worsen AP of all incoming attacks on one ADEPTUS ASTARTES unit by 1.",
    "GO TO GROUND (1CP): targeted INFANTRY gets 6++ invuln + BENEFIT OF COVER.",
    "FIRE OVERWATCH (1CP): shoot at a charging unit within 24\".",
    "LEONINE AGGRESSION (1CP): counter-charge at end of opponent's Charge phase. 6\" range if DEATHWING.",
    "HEROIC INTERVENTION (1CP): CHARACTER within 3\" of enemies moves into Engagement Range.",
    "COUNTER-OPERATIVE (2CP): fight back after an enemy unit finishes fighting.",
  ],
};
const RESERVE_UNITS = ["Deathwing Knights + Judiciar", "Inceptor Squad"];

export default function App() {
  const [screen, setScreen] = useState("guide");
  const [gameStarted, setGameStarted] = useState(false);
  const [goingFirst, setGoingFirst] = useState(null);
  const [tab, setTab] = useState("deploy");
  const [cp, setCp] = useState(0);
  const [cpLog, setCpLog] = useState([]);
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState("command");
  const [checked, setChecked] = useState({});
  const [activationStep, setActivationStep] = useState(0);
  const [reserves, setReserves] = useState({});
  const [activeTerm, setActiveTerm] = useState(null);
  const [activeSheet, setActiveSheet] = useState(null);
  const [openPhaseRef, setOpenPhaseRef] = useState(null);
  const [glossFilter, setGlossFilter] = useState("All");
  const [showGloss, setShowGloss] = useState(false);
  const [showRoster, setShowRoster] = useState(true);
  const [myVp, setMyVp] = useState(0);
  const [oppVp, setOppVp] = useState(0);
  const modCp = (d, r) => { setCp(p => Math.max(0, p + d)); if (r) setCpLog(l => [...l.slice(-9), { d, r }]); };
  const toggleCheck = id => setChecked(c => ({ ...c, [id]: !c[id] }));
  const startGame = () => {
    const r = {};
    RESERVE_UNITS.forEach((u, i) => { r["da-" + i] = false; });
    setReserves(r);
    setGameStarted(true);
    if (goingFirst === false) {
      setPhase("reactive"); setRound(0); setTab("turn");
    } else {
      setPhase("command"); setRound(1); setTab("turn");
      modCp(1, "Command phase +1CP (Round 1)");
      modCp(1, "Masterful Tactician (Azrael) +1CP");
    }
  };
  const ALL_FLOW = PHASES;
  const advancePhase = () => {
    if (round === 0 && phase === "reactive") {
      setRound(1); setPhase("command"); setChecked({}); setActivationStep(0);
      modCp(1, "Command phase +1CP (Round 1)");
      modCp(1, "Masterful Tactician (Azrael) +1CP");
    } else {
      const idx = ALL_FLOW.indexOf(phase);
      if (idx < ALL_FLOW.length - 1) { setPhase(ALL_FLOW[idx + 1]); setActivationStep(0); }
    }
  };
  const nextRound = () => {
    if (round >= 5) return;
    setRound(r => r + 1); setPhase("command"); setChecked({}); setActivationStep(0);
    modCp(1, "Command phase +1CP");
    modCp(1, "Masterful Tactician (Azrael) +1CP");
  };
  const glossCats = ["All", ...Array.from(new Set(Object.values(GLOSSARY).map(v => v.cat)))];
  const charAliasMap = {};
  Object.entries(CHAR_ALIASES).forEach(([k, al]) => al.forEach(a => { charAliasMap[a] = k; }));
  const unitAliasMap = {};
  Object.entries(UNIT_ALIASES).forEach(([k, al]) => al.forEach(a => { unitAliasMap[a] = k; }));
  const seen = new Set();
  const clickable = [...Object.keys(charAliasMap), ...Object.keys(unitAliasMap), ...Object.keys(GLOSSARY)].sort((a, b) => b.length - a.length).filter(t => { if (seen.has(t)) return false; seen.add(t); return true; });
  const H = text => {
    if (!clickable.length) return <span>{text}</span>;
    const re = new RegExp(`(${clickable.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    return text.split(re).map((p, i) => {
      if (charAliasMap[p]) return <span key={i} onClick={e => { e.stopPropagation(); setActiveSheet({ key: charAliasMap[p], type: 'char' }); }} style={{ color: "#60a5fa", cursor: "pointer", borderBottom: "1px dotted #60a5fa88", fontWeight: 600 }}>{p}</span>;
      if (unitAliasMap[p]) return <span key={i} onClick={e => { e.stopPropagation(); setActiveSheet({ key: unitAliasMap[p], type: 'unit' }); }} style={{ color: "#34d399", cursor: "pointer", borderBottom: "1px dotted #34d39988", fontWeight: 600 }}>{p}</span>;
      if (GLOSSARY[p]) return <span key={i} onClick={e => { e.stopPropagation(); setActiveTerm(p); }} style={{ color: "#f59e0b", cursor: "pointer", borderBottom: "1px dotted #f59e0b88", fontWeight: 500 }}>{p}</span>;
      return <span key={i}>{p}</span>;
    });
  };
  const pc = PHASE_COLORS[phase] || "#374151";
  const effectiveRound = round === 0 ? 1 : round;
  const checklist = mkChecklist(goingFirst)(effectiveRound);
  const checkItems = checklist[phase] || [];
  const actItems = mkActivationOrder(effectiveRound)[phase] || [];
  const total = ROSTER.reduce((s, u) => s + u.pts, 0);
  const DatasheetDrawer = () => {
    if (!activeSheet) return null;
    const isChar = activeSheet.type === 'char';
    const data = isChar ? CHARACTERS[activeSheet.key] : UNITS[activeSheet.key];
    if (!data) return null;
    const ac = isChar ? "#3b82f6" : "#10b981";
    const hBg = isChar ? "linear-gradient(135deg,#1e3a5f,#0c1f3a)" : "linear-gradient(135deg,#064e3b,#022c22)";
    const lc = isChar ? "#60a5fa" : "#34d399";
    const aBg = isChar ? "#4c1d95" : "#065f46";
    const aTc = isChar ? "#e879f9" : "#4ade80";
    return (
      <>
        <div onClick={() => setActiveSheet(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", zIndex: 200 }} />
        <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(360px,100vw)", background: "#0a0a14", borderLeft: `2px solid ${ac}`, zIndex: 201, overflowY: "auto", paddingTop: "env(safe-area-inset-top)" }}>
          <div style={{ background: hBg, padding: "18px 16px 14px", borderBottom: `1px solid ${ac}33`, position: "sticky", top: 0, zIndex: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 9, color: lc, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>{data.faction || "DARK ANGELS"}</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: "#fff", marginBottom: 2 }}>{data.fullName || data.name}</div>
                <div style={{ fontSize: 11, color: lc }}>{data.role}</div>
              </div>
              <button onClick={() => setActiveSheet(null)} style={{ background: "transparent", border: `1px solid ${ac}55`, color: "#9ca3af", cursor: "pointer", fontSize: 16, padding: "5px 9px", borderRadius: 7, flexShrink: 0, marginLeft: 8 }}>✕</button>
            </div>
          </div>
          <div style={{ padding: "12px 14px 50px" }}>
            <div style={{ background: "#0d1117", border: `1px solid ${ac}44`, borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ background: isChar ? "#1e3a5f" : "#065f46", padding: "5px 12px", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: lc }}>CHARACTERISTICS</div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Object.keys(data.stats).length},1fr)`, padding: "10px 6px", gap: 2 }}>
                {Object.entries(data.stats).map(([k, v]) => (
                  <div key={k} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: k === "InvSv" ? "#e879f9" : k === "W" ? "#ef4444" : "#fff", lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 8, color: "#6b7280", marginTop: 3 }}>{k}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ background: "#7c2d12", padding: "5px 12px", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#fca5a5" }}>WEAPONS</div>
              {data.weapons.map((w, i) => (
                <div key={i} style={{ padding: "9px 12px", borderBottom: i < data.weapons.length - 1 ? "1px solid #1f2937" : "none" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{w.name}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 3, marginBottom: w.keywords ? 4 : 0 }}>
                    {[["Range", w.range], ["A", w.A], ["WS/BS", w.ws], ["S", w.S], ["AP", w.AP], ["D", w.D]].map(([label, val]) => (
                      <div key={label} style={{ textAlign: "center", background: "#1f2937", borderRadius: 4, padding: "4px 2px" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#e5e7eb" }}>{val}</div>
                        <div style={{ fontSize: 8, color: "#6b7280" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  {w.keywords && <div style={{ fontSize: 10, color: "#f59e0b", marginTop: 3 }}>{H(w.keywords)}</div>}
                </div>
              ))}
            </div>
            <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ background: aBg, padding: "5px 12px", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: aTc }}>ABILITIES</div>
              {data.abilities.map((a, i) => (
                <div key={i} style={{ padding: "9px 12px", borderBottom: i < data.abilities.length - 1 ? "1px solid #1f2937" : "none" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: aTc, marginBottom: 3 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "#d1d5db", lineHeight: 1.6 }}>{H(a.desc)}</div>
                </div>
              ))}
            </div>
            {data.notes && <div style={{ background: "#0d1117", border: "1px solid #f59e0b44", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}><div style={{ background: "#78350f", padding: "5px 12px", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#fcd34d" }}>TACTICAL NOTES</div><div style={{ padding: "10px 12px", fontSize: 12, color: "#d1d5db", lineHeight: 1.7 }}>{H(data.notes)}</div></div>}
            <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ background: "#1f2937", padding: "5px 12px", fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#9ca3af" }}>KEYWORDS</div>
              <div style={{ padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 5 }}>
                {data.keywords.map((k, i) => <span key={i} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "#111827", border: "1px solid #374151", color: "#9ca3af" }}>{k}</span>)}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const TermPopup = () => {
    if (!activeTerm) return null;
    const g = GLOSSARY[activeTerm]; if (!g) return null;
    const col = CAT_COLORS[g.cat] || "#6b7280";
    return (
      <div style={{ position: "sticky", top: 8, zIndex: 100, background: "#0d0d1a", border: `2px solid ${col}`, borderRadius: 12, padding: "13px 16px", marginBottom: 14, boxShadow: `0 0 20px ${col}44` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div><div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 2 }}>{activeTerm}</div><div style={{ fontSize: 10, color: col, fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>{g.cat.toUpperCase()}</div></div>
          <button onClick={() => setActiveTerm(null)} style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 18, padding: "0 0 0 12px" }}>✕</button>
        </div>
        <div style={{ fontSize: 12, color: "#e5e7eb", lineHeight: 1.6 }}>{g.def}</div>
      </div>
    );
  };
  const DeployTab = () => {
    const tips = goingFirst === null ? null : (goingFirst ? DEPLOYMENT.first : DEPLOYMENT.second);
    return (
      <div>
        <div style={{ background: "#0d1117", border: "2px solid #10b981", borderRadius: 10, padding: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#10b981", letterSpacing: 1, fontWeight: 700, marginBottom: 10 }}>WHO GOES FIRST?</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setGoingFirst(true)} style={{ flex: 1, padding: "12px 8px", borderRadius: 10, border: `2px solid ${goingFirst === true ? "#4ade80" : "#374151"}`, background: goingFirst === true ? "#064e3b" : "transparent", color: goingFirst === true ? "#4ade80" : "#9ca3af", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>⚔️ I GO FIRST</button>
            <button onClick={() => setGoingFirst(false)} style={{ flex: 1, padding: "12px 8px", borderRadius: 10, border: `2px solid ${goingFirst === false ? "#f87171" : "#374151"}`, background: goingFirst === false ? "#450a0a" : "transparent", color: goingFirst === false ? "#f87171" : "#9ca3af", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>🛡️ OPPONENT FIRST</button>
          </div>
          {goingFirst !== null && (
            <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: goingFirst ? "#064e3b22" : "#450a0a22", border: `1px solid ${goingFirst ? "#4ade80" : "#f87171"}`, fontSize: 11, color: goingFirst ? "#4ade80" : "#f87171" }}>
              {goingFirst ? "Going first — play aggressively. Rush objectives, set up Turn 2 Deep Strike." : "Going second — play reactively. Your Turn 1 comes AFTER their full turn. Watch their patterns."}
            </div>
          )}
        </div>
        {tips ? (
          <div style={{ background: "#0d1117", border: "2px solid #10b981", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg,#065f46,#022c22)", padding: "10px 14px" }}>
              <div style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>📍 DEPLOYMENT CHECKLIST</div>
              <div style={{ fontSize: 10, color: "#4ade80", marginTop: 2 }}>{goingFirst ? "Going First" : "Going Second"}</div>
            </div>
            <div style={{ padding: 10 }}>
              {tips.map((item, i) => {
                const id = "deploy-" + i; const done = !!checked[id];
                return (
                  <div key={i} onClick={() => toggleCheck(id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 6px", borderRadius: 8, cursor: "pointer", background: done ? "rgba(74,222,128,.08)" : "transparent", marginBottom: 4 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${done ? "#4ade80" : "#374151"}`, background: done ? "#4ade80" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                      {done && <span style={{ fontSize: 13, color: "#000", fontWeight: 900 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 12, color: done ? "#6b7280" : "#e5e7eb", textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{H(item)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ background: "#0d1117", border: "1px dashed #374151", borderRadius: 10, padding: 24, textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Select who goes first to see deployment tips</div>
          </div>
        )}
        <button onClick={startGame} disabled={goingFirst === null}
          style={{ width: "100%", padding: "16px", borderRadius: 10, border: `2px solid ${goingFirst === null ? "#374151" : "#10b981"}`, background: goingFirst === null ? "transparent" : "#065f46", color: goingFirst === null ? "#374151" : "#fff", fontSize: 15, fontWeight: 900, cursor: goingFirst === null ? "not-allowed" : "pointer", letterSpacing: 1, marginBottom: 4 }}>
          {goingFirst === null ? "SELECT TURN ORDER FIRST" : goingFirst ? "⚔️ START GAME — I GO FIRST" : "🛡️ START GAME — OPPONENT GOES FIRST"}
        </button>
        {goingFirst === false && <div style={{ fontSize: 11, color: "#f87171", textAlign: "center", marginTop: 4 }}>You'll see Opponent's Turn 1 reactive plays first, then your Turn 1 begins.</div>}
      </div>
    );
  };
  const TurnTab = () => (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ background: "#1a1a2e", border: "1px solid #065f46", borderRadius: 8, padding: "4px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          {round === 0
            ? <span style={{ fontSize: 13, fontWeight: 900, color: "#f87171", letterSpacing: 1 }}>OPP TURN 1</span>
            : <><span style={{ fontSize: 10, color: "#9ca3af", letterSpacing: 1 }}>ROUND</span><span style={{ fontSize: 22, fontWeight: 900, color: "#10b981", lineHeight: 1 }}>{round}</span><span style={{ fontSize: 10, color: "#9ca3af", letterSpacing: 1 }}>{phase === "reactive" ? "OPP TURN" : "MY TURN"}</span></>
          }
        </div>
        <button onClick={advancePhase} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${pc}`, background: `${pc}33`, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
          {round === 0 ? "→ MY TURN 1" : phase === "end" ? "→ OPP TURN" : phase === "reactive" && round >= 5 ? "GAME OVER" : phase === "reactive" ? "→ NEXT ROUND" : "→ NEXT PHASE"}
        </button>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {ALL_FLOW.map(p => (
          <button key={p} onClick={() => { setPhase(p); setActivationStep(0); }} style={{ flex: "1 1 auto", padding: "8px 4px", borderRadius: 8, border: `2px solid ${PHASE_COLORS[p]}`, background: phase === p ? PHASE_COLORS[p] : "transparent", color: phase === p ? "#fff" : PHASE_COLORS[p], fontSize: 10, fontWeight: 800, cursor: "pointer" }}>
            {PHASE_ICONS[p]}<br />{p === "reactive" ? "OPP" : PHASE_LABELS[p].split(" ")[0].toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ background: "#0d1117", border: `2px solid ${pc}`, borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ background: pc, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>{PHASE_ICONS[phase]} {PHASE_LABELS[phase].toUpperCase()} — CHECKLIST</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>{checkItems.filter((_, i) => checked[phase + "-" + i]).length}/{checkItems.length}</span>
        </div>
        <div style={{ padding: 10 }}>
          {checkItems.map((item, i) => {
            const id = phase + "-" + i; const done = !!checked[id];
            return (
              <div key={i} onClick={() => toggleCheck(id)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 6px", borderRadius: 8, cursor: "pointer", background: done ? "rgba(74,222,128,.08)" : "transparent", marginBottom: 4 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${done ? "#4ade80" : "#374151"}`, background: done ? "#4ade80" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                  {done && <span style={{ fontSize: 13, color: "#000", fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ fontSize: 12, color: done ? "#6b7280" : "#e5e7eb", textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{H(item)}</span>
              </div>
            );
          })}
          {checkItems.length > 0 && <button onClick={() => { const c = { ...checked }; checkItems.forEach((_, i) => { c[phase + "-" + i] = true; }); setChecked(c); }} style={{ width: "100%", marginTop: 6, padding: "6px", borderRadius: 6, border: "1px solid #374151", background: "transparent", color: "#6b7280", fontSize: 11, cursor: "pointer" }}>Mark all done</button>}
        </div>
      </div>
      <div style={{ background: "#0d1117", border: `2px solid ${pc}55`, borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ background: `${pc}88`, padding: "10px 14px" }}><span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>🔢 ACTIVATION ORDER</span></div>
        <div style={{ padding: 10 }}>
          {actItems.map((item, i) => (
            <div key={i} onClick={() => setActivationStep(i)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 6px", borderRadius: 8, cursor: "pointer", background: activationStep === i ? `${pc}33` : "transparent", border: activationStep === i ? `1px solid ${pc}` : "1px solid transparent", marginBottom: 4 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: activationStep === i ? pc : "#1f2937", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, marginTop: 1 }}>{i + 1}</div>
              <span style={{ fontSize: 12, color: activationStep === i ? "#fff" : "#d1d5db", lineHeight: 1.5 }}>{H(item)}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <button onClick={() => setActivationStep(s => Math.max(0, s - 1))} style={{ flex: 1, padding: "8px", borderRadius: 6, border: `1px solid ${pc}`, background: "transparent", color: pc, fontSize: 12, cursor: "pointer" }}>← Prev</button>
            <button onClick={() => setActivationStep(s => Math.min(actItems.length - 1, s + 1))} style={{ flex: 1, padding: "8px", borderRadius: 6, border: `1px solid ${pc}`, background: pc, color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>Next →</button>
          </div>
        </div>
      </div>
      {phase === "end" && <button onClick={advancePhase} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "2px solid #1a1a2e", background: "#0d1117", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 12 }}>🛡️ END MY TURN — START OPPONENT'S TURN</button>}
      {phase === "reactive" && <button onClick={round === 0 ? advancePhase : nextRound} disabled={round >= 5 && round !== 0}
        style={{ width: "100%", padding: "14px", borderRadius: 10, border: `2px solid ${round === 0 ? "#f87171" : round >= 5 ? "#374151" : "#4ade80"}`, background: round === 0 ? "#450a0a" : round >= 5 ? "#1f2937" : "#065f46", color: "#fff", fontSize: 14, fontWeight: 800, cursor: round >= 5 && round !== 0 ? "not-allowed" : "pointer", marginBottom: 12 }}>
        {round === 0 ? "⚔️ OPP TURN 1 DONE — START MY TURN 1" : round >= 5 ? "🏁 GAME OVER — ROUND 5 COMPLETE" : `✅ END ROUND ${round} — START ROUND ${round + 1}`}
      </button>}
    </div>
  );
  const CpTab = () => (
    <div>
      <div style={{ background: "#0d1117", border: "2px solid #f59e0b", borderRadius: 12, padding: "20px 16px", marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 2, marginBottom: 8 }}>CURRENT COMMAND POINTS</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>{cp}</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Round {round === 0 ? "(Opp Turn 1)" : round} · Wrath of the Rock</div>
        <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center" }}>
          <button onClick={() => modCp(-2, "Spent 2CP")} style={{ width: 50, height: 50, borderRadius: 10, border: "2px solid #ef4444", background: "#7f1d1d", color: "#fff", fontSize: 20, fontWeight: 900, cursor: "pointer" }}>−2</button>
          <button onClick={() => modCp(-1, "Spent 1CP")} style={{ width: 50, height: 50, borderRadius: 10, border: "2px solid #f87171", background: "#991b1b", color: "#fff", fontSize: 24, fontWeight: 900, cursor: "pointer" }}>−</button>
          <button onClick={() => modCp(1, "Gained 1CP")} style={{ width: 50, height: 50, borderRadius: 10, border: "2px solid #4ade80", background: "#065f46", color: "#fff", fontSize: 24, fontWeight: 900, cursor: "pointer" }}>+</button>
          <button onClick={() => modCp(2, "Gained 2CP")} style={{ width: 50, height: 50, borderRadius: 10, border: "2px solid #4ade80", background: "#064e3b", color: "#fff", fontSize: 20, fontWeight: 900, cursor: "pointer" }}>+2</button>
        </div>
      </div>
      <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 10, padding: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, marginBottom: 10 }}>QUICK SPEND</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {STRATAGEMS.map(s => (
            <div key={s.n} style={{ display: "flex", alignItems: "stretch", borderRadius: 8, border: `1px solid ${s.c === 0 ? "#4ade80" : "#f59e0b"}`, overflow: "hidden" }}>
              <button onClick={() => modCp(-s.c, `Spent: ${s.n}`)} style={{ width: 54, flexShrink: 0, background: s.c === 0 ? "#064e3b" : "#1a1200", border: "none", color: s.c === 0 ? "#4ade80" : "#f59e0b", fontSize: s.c === 0 ? 9 : 13, fontWeight: 900, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, padding: "8px 4px", borderRight: `1px solid ${s.c === 0 ? "#4ade80" : "#f59e0b"}` }}>
                <span>{s.c === 0 ? "FREE" : s.c + "CP"}</span><span style={{ fontSize: 8, opacity: .5 }}>TAP</span>
              </button>
              <div style={{ padding: "7px 10px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#e5e7eb" }}>{s.n}</span>
                  <span style={{ fontSize: 9, color: "#6b7280" }}>{s.phase}</span>
                </div>
                <span style={{ fontSize: 10, color: "#9ca3af", lineHeight: 1.4 }}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 10, padding: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, marginBottom: 8 }}>CP INCOME</div>
        {[
          "Base: +1CP per Command phase",
          "MASTERFUL TACTICIAN (Azrael): +1CP per Command phase if on battlefield",
          "Total: +2CP per Command phase with Azrael alive",
          "TELEPORT HOMER: Deathwing Knights use Rapid Ingress for 0CP (once per battle)",
        ].map((t, i, a) => <div key={i} style={{ fontSize: 12, color: "#d1d5db", padding: "4px 0", borderBottom: i < a.length - 1 ? "1px solid #1f2937" : "none" }}>· {t}</div>)}
        <button onClick={() => { modCp(1, "Command phase +1CP"); modCp(1, "Masterful Tactician +1CP"); }} style={{ width: "100%", marginTop: 10, padding: "10px", borderRadius: 8, border: "2px solid #4ade80", background: "#065f46", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ COMMAND PHASE: Gain 2CP (Base + Azrael)</button>
      </div>
      <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 10, padding: 12 }}>
        <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, marginBottom: 8 }}>CP LOG</div>
        {cpLog.length === 0 && <div style={{ fontSize: 12, color: "#374151", textAlign: "center", padding: "8px 0" }}>No actions yet</div>}
        {[...cpLog].reverse().map((l, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #1f2937", fontSize: 12 }}>
            <span style={{ color: "#9ca3af" }}>{l.r}</span>
            <span style={{ color: l.d > 0 ? "#4ade80" : "#f87171", fontWeight: 700 }}>{l.d > 0 ? "+" : ""}{l.d}CP</span>
          </div>
        ))}
        {cpLog.length > 0 && <button onClick={() => setCpLog([])} style={{ width: "100%", marginTop: 8, padding: "6px", borderRadius: 6, border: "1px solid #374151", background: "transparent", color: "#6b7280", fontSize: 11, cursor: "pointer" }}>Clear log</button>}
      </div>
    </div>
  );
  const ReservesTab = () => (
    <div>
      <div style={{ background: "#0d1117", border: "2px solid #1e3a5f", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ background: "#1e3a5f", padding: "10px 14px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>📡 RESERVE TRACKER</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>Round {round === 0 ? "(Opp T1)" : round}</span>
        </div>
        <div style={{ padding: 10 }}>
          {RESERVE_UNITS.map((unit, i) => {
            const key = "da-" + i; const arrived = reserves[key];
            return (
              <div key={i} onClick={() => setReserves(r => ({ ...r, [key]: !r[key] }))} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 10px", borderRadius: 10, background: arrived ? "rgba(74,222,128,.08)" : "#111122", border: `2px solid ${arrived ? "#4ade80" : "#374151"}`, marginBottom: 8, cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: arrived ? "#065f46" : "#1f2937", border: `2px solid ${arrived ? "#4ade80" : "#374151"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 18 }}>{arrived ? "✅" : "🚀"}</span></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: arrived ? "#4ade80" : "#e5e7eb" }}>{unit}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{arrived ? "ARRIVED" : "In Reserve — tap when deployed"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ background: "#0d1117", border: "1px solid #1f2937", borderRadius: 10, padding: 12, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, marginBottom: 8 }}>DEEP STRIKE RULES</div>
        {["Place 9\"+ from ALL enemy models in your Reinforcement step.", "RAPID INGRESS (1CP): arrive in OPPONENT'S Reinforcement step — surprise arrival.", "TELEPORT HOMER (Deathwing Knights): use Rapid Ingress for 0CP once per battle — land within 3\" of the token.", "A failed charge after Deep Strike: unit sits 9\"+ away with no fight that turn.", "Tip: land as close to 9\" as legally possible to maximise charge options."].map((t, i) => (
          <div key={i} style={{ fontSize: 12, color: "#d1d5db", padding: "4px 0", borderBottom: i < 4 ? "1px solid #1f2937" : "none" }}>· {t}</div>
        ))}
      </div>
    </div>
  );
  const PhasesTab = () => {
    const roleColors = { "Warlord": "#f59e0b", "Character": "#60a5fa", "Elite": "#e879f9", "Battleline": "#4ade80", "Fire Support": "#f87171", "Fast Attack": "#f97316", "Heavy Support": "#94a3b8", "Infiltrator": "#22d3ee" };
    return (
      <div>
        <div style={{ background: "#0d1117", border: "2px solid #10b981", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
          <div onClick={() => setShowRoster(s => !s)} style={{ background: "linear-gradient(135deg,#065f46,#022c22)", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>📋 ARMY ROSTER</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 700 }}>{total} pts</span>
              <span style={{ color: "#4ade80", fontSize: 18, transform: showRoster ? "rotate(180deg)" : "none", transition: ".2s" }}>▾</span>
            </div>
          </div>
          {showRoster && <div style={{ padding: "8px 10px" }}>
            {ROSTER.map((entry, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 4px", borderBottom: i < ROSTER.length - 1 ? "1px solid #1f2937" : "none" }}>
                <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#1f2937", border: `1px solid ${roleColors[entry.role] || "#374151"}`, color: roleColors[entry.role] || "#9ca3af", fontWeight: 700, whiteSpace: "nowrap", marginTop: 1 }}>{entry.role.toUpperCase()}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{H(entry.unit)}</span>
                    <span style={{ fontSize: 10, color: "#6b7280", flexShrink: 0, marginLeft: 6 }}>{entry.pts}pts</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1, lineHeight: 1.4 }}>{entry.notes}</div>
                </div>
              </div>
            ))}
          </div>}
        </div>
        <button onClick={() => setShowGloss(s => !s)} style={{ width: "100%", background: showGloss ? "#1a1a00" : "#111100", border: "2px solid #f59e0b", borderRadius: 10, padding: "10px 16px", color: "#fcd34d", fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>📖 GLOSSARY & DATASHEETS</span><span style={{ transform: showGloss ? "rotate(180deg)" : "none", transition: ".2s" }}>▾</span>
        </button>
        {showGloss && (
          <div style={{ background: "#0f0f00", border: "1px solid #78350f", borderRadius: 10, marginBottom: 12, padding: 12 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {glossCats.map(c => <button key={c} onClick={() => setGlossFilter(c)} style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #f59e0b", background: glossFilter === c ? "#f59e0b" : "transparent", color: glossFilter === c ? "#000" : "#f59e0b", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{c}</button>)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
              {Object.entries(GLOSSARY).filter(([, v]) => glossFilter === "All" || v.cat === glossFilter).map(([term, g]) => (
                <div key={term} onClick={() => setActiveTerm(term)} style={{ background: "#0d0d14", borderLeft: `3px solid ${CAT_COLORS[g.cat] || "#6b7280"}`, borderRadius: 6, padding: "7px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{term}</span>
                  <span style={{ fontSize: 10, color: CAT_COLORS[g.cat] || "#6b7280" }}>{g.cat}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #374151", paddingTop: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: 1, marginBottom: 8 }}>CHARACTER DATASHEETS</div>
              {Object.entries(CHARACTERS).map(([key, char]) => (
                <div key={key} onClick={() => setActiveSheet({ key, type: 'char' })} style={{ background: "#0d0d14", borderLeft: "3px solid #3b82f6", borderRadius: 6, padding: "7px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{char.fullName}</span>
                  <span style={{ fontSize: 10, color: "#60a5fa" }}>{char.role.split(" · ")[0]}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #374151", paddingTop: 10 }}>
              <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: 1, marginBottom: 8 }}>UNIT DATASHEETS</div>
              {Object.entries(UNITS).map(([key, unit]) => (
                <div key={key} onClick={() => setActiveSheet({ key, type: 'unit' })} style={{ background: "#0d0d14", borderLeft: "3px solid #10b981", borderRadius: 6, padding: "7px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{unit.name}</span>
                  <span style={{ fontSize: 10, color: "#34d399" }}>{unit.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {PHASES.map(p => {
          const isOpen = openPhaseRef === p; const col = PHASE_COLORS[p]; const items = PHASE_REFERENCE[p] || [];
          return (
            <div key={p} style={{ marginBottom: 8 }}>
              <div onClick={() => setOpenPhaseRef(isOpen ? null : p)} style={{ borderRadius: 10, padding: "12px 16px", cursor: "pointer", background: isOpen ? col : "#111122", border: `2px solid ${col}`, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: isOpen ? `0 0 12px ${col}55` : "none" }}>
                <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: 1, color: isOpen ? "#fff" : col }}>{PHASE_ICONS[p]} {PHASE_LABELS[p].toUpperCase()}</span>
                <span style={{ color: col, fontSize: 18, transform: isOpen ? "rotate(180deg)" : "none", transition: ".2s" }}>▾</span>
              </div>
              {isOpen && <div style={{ background: "#0d0d1f", border: `1px solid ${col}55`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: 12 }}><ul style={{ paddingLeft: 18 }}>{items.map((item, i) => <li key={i} style={{ fontSize: 13, color: "#e5e7eb", marginBottom: 7, lineHeight: 1.6 }}>{H(item)}</li>)}</ul></div>}
              {p !== "reactive" && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "3px 0" }}><div style={{ width: 2, height: 10, background: "#1e3a5f" }} /><div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid #1e3a5f" }} /></div>}
            </div>
          );
        })}
      </div>
    );
  };
  const tabs = [
    ...(!gameStarted ? [{ id: "deploy", icon: "📍", label: "DEPLOY" }] : []),
    { id: "turn", icon: "⚡", label: "ACTIVE TURN" },
    { id: "cp", icon: "💰", label: "CP TRACKER" },
    { id: "reserves", icon: "🚀", label: "RESERVES" },
    { id: "phases", icon: "📖", label: "REFERENCE" },
  ];
  return (
    <div style={{ background: "#0a0a14", minHeight: "100vh", fontFamily: "'Segoe UI',sans-serif", color: "#fff" }}>
      <div style={{ background: "#0d1117", borderBottom: "1px solid #1e3a5f", padding: "10px 14px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div>
              <div style={{ fontSize: 9, color: "#10b981", letterSpacing: 2, fontWeight: 700 }}>WARHAMMER 40,000</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: "#4ade80" }}>🦁 Dark Angels · {total} pts</div>
              <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: 1 }}>WRATH OF THE ROCK</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "stretch", gap: 5, marginBottom: 8 }}>
          <div style={{ flex: 1, background: "#0a1a0a", border: "2px solid #4ade80", borderRadius: 10, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#4ade80", letterSpacing: 1, fontWeight: 700 }}>MY VP</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <button onClick={() => setMyVp(v => Math.max(0, v - 1))} style={{ background: "transparent", border: "none", color: "#4ade80", fontSize: 16, fontWeight: 900, cursor: "pointer", padding: "0 2px", lineHeight: 1 }}>−</button>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#4ade80", lineHeight: 1, minWidth: 28, textAlign: "center" }}>{myVp}</div>
              <button onClick={() => setMyVp(v => v + 1)} style={{ background: "transparent", border: "none", color: "#4ade80", fontSize: 16, fontWeight: 900, cursor: "pointer", padding: "0 2px", lineHeight: 1 }}>+</button>
            </div>
          </div>
          <div onClick={() => setTab("cp")} style={{ background: "#1a1a00", border: "2px solid #f59e0b", borderRadius: 10, padding: "4px 12px", cursor: "pointer", textAlign: "center", minWidth: 58 }}>
            <div style={{ fontSize: 9, color: "#6b7280", letterSpacing: 1 }}>CP</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>{cp}</div>
            <div style={{ fontSize: 8, color: "#6b7280" }}>R{round === 0 ? "0" : round}</div>
          </div>
          <div style={{ flex: 1, background: "#1a0a0a", border: "2px solid #f87171", borderRadius: 10, padding: "4px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#f87171", letterSpacing: 1, fontWeight: 700 }}>OPP VP</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <button onClick={() => setOppVp(v => Math.max(0, v - 1))} style={{ background: "transparent", border: "none", color: "#f87171", fontSize: 16, fontWeight: 900, cursor: "pointer", padding: "0 2px", lineHeight: 1 }}>−</button>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#f87171", lineHeight: 1, minWidth: 28, textAlign: "center" }}>{oppVp}</div>
              <button onClick={() => setOppVp(v => v + 1)} style={{ background: "transparent", border: "none", color: "#f87171", fontSize: 16, fontWeight: 900, cursor: "pointer", padding: "0 2px", lineHeight: 1 }}>+</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #1e3a5f" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "8px 2px", background: "transparent", border: "none", borderBottom: tab === t.id ? "3px solid #10b981" : "3px solid transparent", color: tab === t.id ? "#10b981" : "#6b7280", fontSize: 9, fontWeight: 700, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 15 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "14px 14px 100px" }}>
        <TermPopup />
        {tab === "deploy" && <DeployTab />}
        {tab === "turn" && <TurnTab />}
        {tab === "cp" && <CpTab />}
        {tab === "reserves" && <ReservesTab />}
        {tab === "phases" && <PhasesTab />}
      </div>
      <DatasheetDrawer />
    </div>
  );
}
