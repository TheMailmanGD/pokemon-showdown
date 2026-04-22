import asyncio
from poke_env.player import SimpleHeuristicsPlayer
from poke_env import AccountConfiguration, LocalhostServerConfiguration


team1 = """
Clodsire @ Black Sludge  
Ability: Water Absorb  
Tera Type: Poison  
EVs: 252 HP / 100 Def / 156 SpD  
Relaxed Nature  
- Toxic  
- Toxic Spikes  
- Recover  
- Earthquake  

Deoxys-Defense @ Leftovers  
Ability: Pressure  
Tera Type: Steel  
EVs: 248 HP / 8 Def / 252 SpD  
Sassy Nature  
IVs: 0 Atk / 0 Spe  
- Mirror Coat  
- Counter  
- Iron Defense  
- Amnesia  

Skeledirge @ Throat Spray  
Ability: Unaware  
Tera Type: Fairy  
EVs: 248 HP / 252 SpA / 8 SpD  
Modest Nature  
- Torch Song  
- Tera Blast  
- Overheat  
- Slack Off  

Archaludon @ Leftovers  
Ability: Stamina  
Tera Type: Steel  
EVs: 252 HP / 252 Atk / 4 SpD  
Adamant Nature  
- Body Press  
- Iron Defense  
- Dragon Claw  
- Iron Head  

Zamazenta-Crowned @ Rusted Shield  
Ability: Dauntless Shield  
Tera Type: Fighting  
EVs: 252 HP / 252 Atk / 4 SpD  
Adamant Nature  
- Body Press  
- Iron Defense  
- Behemoth Bash  
- Play Rough  

Calyrex-Ice @ Leftovers  
Ability: As One (Glastrier)  
Tera Type: Psychic  
EVs: 252 HP / 252 Atk / 4 SpD  
Adamant Nature  
- Glacial Lance  
- Iron Defense  
- High Horsepower  
- Swords Dance  
"""
async def main():
	player = SimpleHeuristicsPlayer(
		account_configuration=AccountConfiguration("lucky lewis", "randombot"),
		server_configuration=LocalhostServerConfiguration,
		battle_format="gen9anythinggoes",
		team=team1
		avatar="gambler"
	)

	# Playing 5 games on the ladder
	await player.ladder(5)

    # Print the rating of the player and its opponent after each battle
	for battle in player.battles.values():
		print(battle.rating, battle.opponent_rating)

if __name__ == "__main__":
    asyncio.run(main())