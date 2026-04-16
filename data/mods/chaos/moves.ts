export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// psychic: {
	// 	num: 94,
	// 	accuracy: 100,
	// 	basePower: 90,
	// 	category: "Special",
	// 	name: "Psychic",
	// 	pp: 10,
	// 	priority: 0,
	// 	flags: { protect: 1, mirror: 1, metronome: 1 },
	// 	secondary: {
	// 		chance: 10,
	// 		boosts: {
	// 			spd: -1,
	// 		},
	// 	},
	// 	target: "normal",
	// 	type: "Psychic",
	// 	contestType: "Clever",
	// },
	psyblast: {
		num: 10001,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Psyblast",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {},
		self: {
			chance: 10,
			boosts: {
				def: 1,
			},
		},
		target: "normal",
		type: "Psychic",	
	},
	shadowslash: {
		num: 10002,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Shadow Slash",
		pp: 25,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {},
		self: {
			chance: 10,
			boosts: {
				spe: 1,
			},
		},
		target: "normal",
		type: "Dark",	
	},
	ascendedcyclone: {
		num: 10003,
		accuracy: 95,
		basePower: 130,
		category: "Special",
		name: "Ascended Cyclone",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onHit(target, source, move) {
			if (!source) return;
			if (this.randomChance(1, 2)) {
				this.boost({ def: -1 }, source, source, move);
			}
			if (this.randomChance(1, 2)) {
				this.boost({ spd: -1 }, source, source, move);
			}
		},
		target: "normal",
		type: "Psychic",	
	},
	vigorousstrike: {
		num: 10004,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Vigorous Strike",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		recoil: [33, 100],
		secondary: {
				chance: 10,
				volatileStatus: 'confusion',
			},
		self: {
			chance: 10,
			boosts: {
				atk: 1,
			},
		},
		target: "normal",
		type: "Fighting",
	},
	cataclysmictalon: {
		num: 10005,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Cataclysmic Talon",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)) move.category = 'Special';
		},
		self: {
			chance: 100,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Dark",
	}
};