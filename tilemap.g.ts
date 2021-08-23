// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`0b000900010101010101010101010101040404040404040404010104040400020004040401010404040000000404040101040404000300040404010104040404040404040401010404040404040404040101010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile8,myTiles.tile9], TileScale.Sixteen);
            case "level3":
            case "level3":return tiles.createTilemap(hex`0b000900010101010101010101010101000000000000000000010100000000020000000001010000000000000000000101040404000000040404010104040400000004040401010404040003000404040101010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile8,myTiles.tile9], TileScale.Sixteen);
            case "level4":
            case "level4":return tiles.createTilemap(hex`0b000900010101010101010101010101000000000000000000010100020000000000020001010000000000000000000101040404000000040404010104040400000004040401010404040003000404040101010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile8,myTiles.tile9], TileScale.Sixteen);
            case "level5":
            case "level5":return tiles.createTilemap(hex`0b000900010101010101010101010101000000000000000000010100020000000000000001010000000000000000000101000000000000000000010100000000000000020001010000000003000000000101010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile8], TileScale.Sixteen);
            case "level2":
            case "level2":return tiles.createTilemap(hex`0b000900010101010101010101010101040404000000040404010104040400020004040401010404040000000404040101040404000000040404010104040400000004040401010404040003000404040101010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 . . . 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile8,myTiles.tile9,myTiles.tile10], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "myTile":
            case "tile1":return tile1;
            case "bad guy 1":
            case "tile2":return tile2;
            case "bad guy 2":
            case "tile3":return tile3;
            case "bad guy 3":
            case "tile4":return tile4;
            case "bad guy 4":
            case "tile5":return tile5;
            case "bad guy 5":
            case "tile6":return tile6;
            case "bad guy 6":
            case "tile7":return tile7;
            case "player start":
            case "tile8":return tile8;
            case "myTile0":
            case "tile9":return tile9;
            case "myTile1":
            case "tile10":return tile10;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
