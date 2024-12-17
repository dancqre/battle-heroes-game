enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER"
}

enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED"
}

interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}

interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    isAlive: boolean;
}

type AttackResult = {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
};

let heroIdCounter = 1;

function createHero(name: string, type: HeroType): Hero {
    const baseStats: Record<HeroType, HeroStats> = {
        [HeroType.Warrior]: { health: 120, attack: 15, defense: 10, speed: 8 },
        [HeroType.Mage]: { health: 80, attack: 20, defense: 5, speed: 10 },
        [HeroType.Archer]: { health: 100, attack: 18, defense: 7, speed: 12 }
    };

    return {
        id: heroIdCounter++,
        name,
        type,
        attackType: type === HeroType.Warrior ? AttackType.Physical : type === HeroType.Mage ? AttackType.Magical : AttackType.Ranged,
        stats: baseStats[type],
        isAlive: true
    };
}

function calculateDamage(attacker: Hero, defender: Hero): AttackResult {
    const { attack, speed } = attacker.stats;
    const { defense, health } = defender.stats;

    let damage = Math.max(0, attack - defense);
    const isCritical = Math.random() < 0.2; 
    if (isCritical) damage *= 2;

    const remainingHealth = Math.max(0, health - damage);
    return { damage, isCritical, remainingHealth };
}

function findHeroByProperty<T extends keyof Hero>(
    heroes: Hero[],
    property: T,
    value: Hero[T]
): Hero | undefined {
    return heroes.find(hero => hero[property] === value);
}

function battleRound(hero1: Hero, hero2: Hero): string {
    if (!hero1.isAlive || !hero2.isAlive) {
        return "Один або обидва герої мертві. Бій неможливий.";
    }

    const firstAttacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const secondAttacker = firstAttacker === hero1 ? hero2 : hero1;

    const firstAttackResult = calculateDamage(firstAttacker, secondAttacker);
    secondAttacker.stats.health = firstAttackResult.remainingHealth;
    secondAttacker.isAlive = secondAttacker.stats.health > 0;

    let result = `${firstAttacker.name} атакує ${secondAttacker.name}, завдає ${firstAttackResult.damage} пошкоджень.`;
    if (firstAttackResult.isCritical) result += " Критичний удар!";

    if (!secondAttacker.isAlive) {
        result += ` ${secondAttacker.name} загинув.`;
        return result;
    }

    const secondAttackResult = calculateDamage(secondAttacker, firstAttacker);
    firstAttacker.stats.health = secondAttackResult.remainingHealth;
    firstAttacker.isAlive = firstAttacker.stats.health > 0;

    result += `\n${secondAttacker.name} атакує у відповідь ${firstAttacker.name}, завдає ${secondAttackResult.damage} пошкоджень.`;
    if (secondAttackResult.isCritical) result += " Критичний удар!";

    if (!firstAttacker.isAlive) {
        result += ` ${firstAttacker.name} загинув.`;
    }

    return result;
}

const heroes: Hero[] = [
    createHero("Дмитро", HeroType.Warrior),
    createHero("Мерлін", HeroType.Mage),
    createHero("Офдій", HeroType.Archer)
];

console.log("Список героїв:", heroes);

const foundHero = findHeroByProperty(heroes, "type", HeroType.Mage);
console.log("Знайдений герой:", foundHero);

const battleResult1 = battleRound(heroes[0], heroes[1]);
console.log("Результат першого бою:\n", battleResult1);

const battleResult2 = battleRound(heroes[0], heroes[2]);
console.log("Результат другого бою:\n", battleResult2);
