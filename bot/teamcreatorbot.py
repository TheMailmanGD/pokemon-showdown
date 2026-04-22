import asyncio

import numpy as np
import teamcreatorteams as teams

from poke_env.player import RandomPlayer
from poke_env.teambuilder import Teambuilder

pokemons = teams.normal.split("\n\n") + team_2.split("\n\n")
pokemons = [pokemon.strip() for pokemon in sorted(pokemons)]
pokemons