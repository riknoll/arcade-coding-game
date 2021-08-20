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

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`0b000900010101010101010101010101000000000000000000010100000200000002000001010000000000000000000101000000000000000000010100000000000000000001010000000008000000000101010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7,myTiles.tile8], TileScale.Sixteen);
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
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
