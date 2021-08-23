enum BlockKind {
    MoveForward,
    MoveBackward,
    MoveLeft,
    MoveRight,
    TurnClockwise,
    TurnCounterClockwise,
    TurnRandom,
    MeleeAttack,
    RangedAttack,
    FireSpell,
    IceSpell,
    LightningSpell,
    Guard,
    Wait,
    TimesTwo,
    TimesThree,
    TimesFour,
    Aim
}

const availableBlocks = [
    getBlock(BlockKind.MoveForward),
    getBlock(BlockKind.MoveBackward),
    getBlock(BlockKind.MoveLeft),
    getBlock(BlockKind.MoveRight),
    getBlock(BlockKind.TurnClockwise),
    getBlock(BlockKind.TurnCounterClockwise),
    getBlock(BlockKind.TurnRandom),
    getBlock(BlockKind.MeleeAttack),
    getBlock(BlockKind.RangedAttack),
    getBlock(BlockKind.FireSpell),
    getBlock(BlockKind.IceSpell),
    getBlock(BlockKind.LightningSpell),
    getBlock(BlockKind.Guard),
    getBlock(BlockKind.Wait),
    getBlock(BlockKind.TimesTwo),
    getBlock(BlockKind.TimesThree),
    getBlock(BlockKind.TimesFour),
    getBlock(BlockKind.Aim)
];

class Item {
    icon: Image;
    description: string;
    name: string;

    constructor() { }
}

class Block extends Item {
    _duration: number;
    rarity: number;

    get duration() {
        return (this._duration * scriptTimeModifier) | 0
    }

    set duration(val: number) {
        this._duration = val;
    }

    constructor(public kind: BlockKind) {
        super();
    }
}

function getRandomBlock(currentScript: Block[]) {
    let totalRarity = 0;
    let maxRarity = 0;

    for (const b of availableBlocks) {
        maxRarity = Math.max(calculateRarity(b, currentScript), maxRarity);
    }

    for (const b of availableBlocks) {
        totalRarity += maxRarity - calculateRarity(b, currentScript) + 1;
    }

    let seed = Math.randomRange(1, totalRarity);

    for (const b of availableBlocks) {
        seed -= maxRarity - calculateRarity(b, currentScript) + 1;

        if (seed <= 0) return b;
    }
    return undefined;
}

function calculateRarity(block: Block, script: Block[]) {
    let rarity = block.rarity;

    for (const b of script) {
        if (b && b.kind === block.kind) rarity += 3;
    }
    return rarity;
}

function makeBlock(kind: BlockKind, icon: Image, name: string, description: string, duration: number, rarity: number) {
    const result = new Block(kind);
    result.icon = icon;
    result.name = name;
    result.description = description;
    result.duration = duration;
    result.rarity = rarity;
    return result;
}

function getBlock(kind: BlockKind) {
    switch (kind) {
        case BlockKind.MoveForward:
            return makeBlock(
                kind,
                assets.image`moveForward`,
                "Move Forward",
                "Take a few steps forward",
                800,
                1
            );
        case BlockKind.MoveLeft:
            return makeBlock(
                kind,
                assets.image`moveLeft`,
                "Move Left",
                "Take a few steps to the left",
                800,
                5
            );
        case BlockKind.MoveRight:
            return makeBlock(
                kind,
                assets.image`moveRight`,
                "Move Right",
                "Take a few steps to the right",
                800,
                5
            );
        case BlockKind.MoveBackward:
            return makeBlock(
                kind,
                assets.image`moveBack`,
                "Move Backward",
                "Take a few steps backward",
                800,
                5
            );
        case BlockKind.TurnClockwise:
            return makeBlock(
                kind,
                assets.image`turnClockwise`,
                "CW Turn",
                "Rotate clockwise by 45 degrees",
                200,
                1
            );
        case BlockKind.TurnCounterClockwise:
            return makeBlock(
                kind,
                assets.image`turnCounterClockwise`,
                "CCW Turn",
                "Rotate counter clockwise by 45 degrees",
                200,
                1
            );
        case BlockKind.TurnRandom:
            return makeBlock(
                kind,
                assets.image`turnRandom`,
                "Random Turn",
                "Rotate a random amount",
                200,
                10
            );
        case BlockKind.MeleeAttack:
            return makeBlock(
                kind,
                assets.image`melee`,
                "Sword Attack",
                "Swing your sword in an arc",
                300,
                10
            );
        case BlockKind.RangedAttack:
            return makeBlock(
                kind,
                assets.image`arrow`,
                "Arrow",
                "Launch an arrow forward",
                200,
                10
            );
        case BlockKind.FireSpell:
            return makeBlock(
                kind,
                assets.image`fireBall`,
                "Fire Spell",
                "Launch a fireball forward",
                500,
                20
            );
        case BlockKind.IceSpell:
            return makeBlock(
                kind,
                assets.image`ice`,
                "Ice Spell",
                "Create an icy aura that damages enemies around you",
                500,
                20
            );
        case BlockKind.LightningSpell:
            return makeBlock(
                kind,
                assets.image`lightning`,
                "Lightning Spell",
                "Launch a lightning strike that jumps between enemies",
                500,
                20
            );
        case BlockKind.Guard:
            return makeBlock(
                kind,
                assets.image`guard`,
                "Guard",
                "Put up your guard to reduce damage for a short time",
                500,
                15
            );
        case BlockKind.Wait:
            return makeBlock(
                kind,
                assets.image`wait`,
                "Wait",
                "Stand still and do nothing",
                500,
                1
            );
        case BlockKind.TimesTwo:
            return makeBlock(
                kind,
                assets.image`timesTwo`,
                "Times Two",
                "Execute the next action twice",
                100,
                15
            );
        case BlockKind.TimesThree:
            return makeBlock(
                kind,
                assets.image`timesThree`,
                "Times Three",
                "Execute the next action three times",
                100,
                25
            );
        case BlockKind.TimesFour:
            return makeBlock(
                kind,
                assets.image`timesFour`,
                "Times Four",
                "Execute the next action four times",
                100,
                40
            );
        case BlockKind.Aim:
            return makeBlock(
                kind,
                assets.image`aim`,
                "Aim",
                "Rotate towards the nearest enemy",
                500,
                40
            );
    }
}
