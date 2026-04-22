import asyncio

import numpy as np
import teamcreatorteams as teams

from poke_env.player import SimpleHeuristicsPlayer
from poke_env import AccountConfiguration, ShowdownServerConfiguration
from poke_env.teambuilder import Teambuilder

pokemons = teams.normal.split("\n\n") + teams.bug.split("\n\n") + teams.Dark.split("\n\n") + teams.Fairy.split("\n\n") + teams.Fighting.split("\n\n") + teams.fire.split("\n\n") + teams.grass.split("\n\n") + teams.Ground.split("\n\n") + teams.Ice.split("\n\n") + teams.Psychic.split("\n\n") + teams.rock.split("\n\n") + teams.water.split("\n\n") + teams.Flying.split("\n\n") + teams.Poison.split("\n\n") + teams.Dragon.split("\n\n") + teams.Steel.split("\n\n") + teams.Ghost.split("\n\n") + teams.Electric.split("\n\n")
pokemons = [pokemon.strip() for pokemon in sorted(pokemons)]
pokemons

class RandomTeamFromPool(Teambuilder):
    def __init__(self, pokemons):
        self.pokemons = []

        for pokemon in pokemons:
            parsed_mons = self.parse_showdown_team(pokemon)
            self.pokemons.append(parsed_mons[0])

        self.n_pokemons = len(self.pokemons)
        assert self.n_pokemons >= 6

    def yield_team(self):
        idxs = np.random.choice(self.n_pokemons, 6, replace=False)
        team = [self.pokemons[idx] for idx in idxs]

        return self.join_team(team)


custom_builder = RandomTeamFromPool(pokemons)

for _ in range(5):
    print(custom_builder.yield_team())

async def main():
	player = SimpleHeuristicsPlayer(
        account_configuration=AccountConfiguration("lucky lewis", "randombot"),
        server_configuration=ShowdownServerConfiguration,
        battle_format="gen9anythinggoes",
        team=custom_builder,
        max_concurrent_battles=10,
    )
    await player.send_challenges("Themailman3420", n_challenges=1)
    #await player.send_challenges("Furret Walkington", n_challenges=1)


if __name__ == "__main__":
	asyncio.run(main())