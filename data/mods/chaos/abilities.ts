export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	spikedbody: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([5325, 4096]);
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Spiked Body",
		num: 10001,
	},
	lastingimpression: {
		onSwitchOut(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || !target.hp) continue;
				this.damage(pokemon.baseMaxhp / 4, target, pokemon);
			}
		},
		flags: {},
		name: "Lasting Impression",
		num: 10002,
	},
	//reuse
	dragontempest: {
		onStart(source) {
			this.field.setWeather('dragontempest');
		},
		flags: {},
		name: "Dragon Tempest",
		num: 10004,
	},
	prismscape: {
		onStart(pokemon) {
			if (pokemon.setType('Rainbow')) {
				this.add('-start', pokemon, 'typechange', 'Rainbow', '[from] ability: PrismScape');
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (this.field.isWeather('dragontempest')) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, attacker, defender, move) {
			if (this.field.isWeather('dragontempest')) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "PrismScape",
		num: 10005,
		},
};