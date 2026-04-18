export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	snowflake: {
		name: "Snowflake",
		fling: {
			basePower: 10,
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (['snowscape', 'hail'].includes(pokemon.effectiveWeather(true))) {
				return this.chainModify(0.75);
			}
		},
		onModifyAtk(atk, pokemon) {
			if (['snowscape', 'hail'].includes(pokemon.effectiveWeather(true))) {
				return this.chainModify(1.3);
			}
		},
		onModifySpe(spe, pokemon) {
			if (['snowscape', 'hail'].includes(pokemon.effectiveWeather(true))) {
				return this.chainModify(1.3);
			}
		},
		num: 10001,
		gen: 9,
	},
	safetynet: {
		name: "Safety Net",
		fling: {
			basePower: 20,
		},
		onModifyMove(move, pokemon) {
			if ((move.secondaries || move.self) && !move.hasSheerForceBoost) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		num: 10002,
		gen: 9,
	}
};