import asyncio

import numpy as np
import pregeneratedteams as teams

from poke_env.player import SimpleHeuristicsPlayer
from poke_env.teambuilder import Teambuilder


class RandomTeamFromPool(Teambuilder):
    def __init__(self, teams):
        self.teams = [self.join_team(self.parse_showdown_team(team)) for team in teams]

    def yield_team(self):
        return np.random.choice(self.teams)


team_1 = teams.defense
team_2 = teams.splash
team_3 = teams.OHKO

custom_builder = RandomTeamFromPool([team_1, team_2, team_3])


async def main():
    # We create two players
    player = SimpleHeuristicsPlayer(
        battle_format="gen9anythinggoes", team=custom_builder, max_concurrent_battles=10
    )
    await player.ladder(5)


if __name__ == "__main__":
    asyncio.run(main())