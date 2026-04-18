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
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
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
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
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
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
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
	},
	freezeray: {
		num: 10006,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Freeze Ray",
		pp: 10,
		priority: 0,
		volatileStatus: 'freezeray',
		onTryHit(target) {
			if (target.status || !target.runStatusImmunity('frz')) {
				return false;
			}
		},
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 3,
			onStart(target, source) {
				this.add('-start', target, 'move: Freeze Ray', `[of] ${source}`);
			},
			onResidualOrder: 23,
			onEnd(target) {
				this.add('-end', target, 'move: Freeze Ray', '[silent]');
				target.trySetStatus('frz', this.effectState.source);
			},
		},
		target: "normal",
		type: "Ice",
	},
	ivorythorns: {
		num: 10007,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Ivory Thorns",
		pp: 10,
		priority: 0,
		onModifyMove(move, source, target) {
			if (target?.side) {
				let bonus = 0;
				const spikes = target.side.getSideConditionData('spikes');
				if (spikes?.layers) bonus += 25 * spikes.layers;
				if (target.side.getSideCondition('stealthrock')) bonus += 25;
				if (move.secondary?.chance && bonus) {
					move.secondary.chance = Math.min(100, move.secondary.chance + bonus);
				}
			}
		},
		flags: { contact: 1, protect: 1, metronome: 1 },
		secondary: {
			chance: 25,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
	},
	launchthetoad: {
		num: 10008,
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		name: "Launch The Toad!",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onAfterMove(pokemon, target, move) {
			if (!move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 5), pokemon, pokemon, this.dex.conditions.get(move.id), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		self: {
			chance: 100,
			boosts: {
				atk: -1,
				def: -1,
				spa: -1,
				spd: -1,
				spe: -1,
			},
		},
		target: "normal",
		type: "Poison",
	},
	gigatoncannon: {
		num: 10009,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Gigaton Cannon",
		pp: 5,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, cantusetwice: 1 },
		self: {
			chance: 50,
			boosts: {
				def: 1,
			},
		},
		target: "normal",
		type: "Steel",
	},
	rainbowrush: {
		num: 10010,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Rainbow Rush",
		pp: 10,
		priority: 1,
		flags: { protect: 1, mirror: 1, metronome: 1, contact: 1 },
		target: "normal",
		type: "Dragon",
	}
};