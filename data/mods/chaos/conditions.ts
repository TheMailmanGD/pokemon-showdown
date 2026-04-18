export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	dragontempest: {
		name: 'Dragon Tempest',
		effectType: 'Weather',
		duration: 5,
		onModifyAtkPriority: 10,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.hasType('Dragon') && this.field.isWeather('dragontempest')) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 10,
		onModifySpA(spa, attacker, defender, move) {
			if (attacker.hasType('Dragon') && this.field.isWeather('dragontempest')) {
				return this.chainModify(1.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Dragon Tempest', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'Dragon Tempest');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Dragon Tempest', '[upkeep]');
			if (this.field.isWeather('dragontempest')) this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
};