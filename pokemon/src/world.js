import k from "./main.js";

export function setWorld(worldState){
    function makeTile(type){
        return [
            sprite('tile'),
            {type},
        ]
    }
    const map = [
        k.addLevel([
        "455555555555555556",
        "822222222222222229",
        "822222222222222229",
        "822222222222222229",
        "822abbbc2222222229",
        "abbefffg2222222229",
        "ef3f22222222222229",
        "111122222222222229",
        "111122222222222229",
        "222222277777777777",
        "7777777           ",
        "                  ",
        "h     h     h     ",
        "h     h           ",
        ],
       
    {
        /**
         * 7 -> 1,  9 ->2 , 15 -> 2, 17 -> 3, 18 -> 4, 19 -> 5, 20 -> 6 , 21 -> 7, 26 -> 8, 
         * 28 -> 9 , 34 -> a, 35 -> b, 36 -> c, 42 -> e, 43 -> f, 44 -> g, 61 -> h 
         */
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
          1: () => makeTile("sand-1"),//
          2: () => makeTile("grass-m"),//
          3: () => makeTile("door"),//
          4: () => makeTile("grass-tl"),//
          5: () => makeTile("grass-tm"),//
          6: () => makeTile("grass-tr"),//
          7: () => makeTile("grass-water"),//
          8: () => makeTile("grass-l"),//
          9: () => makeTile("grass-r"),//
          a: () => makeTile("grass-bl"),
          b: () => makeTile("grass-mb"),//
          c: () => makeTile("grass-br"),//
          e: () => makeTile("ground-l"),
          f: () => makeTile("ground-m"),
          g: () => makeTile("ground-r"),
          h: () => makeTile("rock-water"),

        }

        
    }),
    k.addLevel([
        "1212              ",
        "3434              ",
        "          0  0    ",
        "    0 0   00 0    ",
        "            0     ",
        "    12    0 0 0   ",
        "5   34     0      ",
        "6                 ",
        "                  ",
        "                  ",
        "                  ",
        "                  "

        ],{
            tileWidth: 16,
            tileHeight: 16,
            tiles: {
            0: () => makeTile("deco"),
            1: () => makeTile("bigtree-pt1"),
            2: () => makeTile("bigtree-pt2"),
            3: () => makeTile("bigtree-pt3"),
            4: () => makeTile("bigtree-pt4"),
            5: () => makeTile("tree-t"),
            6: () => makeTile("tree-b"),
        },

        }),
    k.addLevel([
        "000000000000000000",
        "1111              0",
        "                  0",
        "                  0",
        "   2    2         0",
        "   233332         0",
        "333331            0",
        "1                 0",
        "                  0",
        "       000000000000",
        "0000000           ",
        "                  "

    ],{
        ileWidth: 16,
        tileHeight: 16,
        tiles: {
          0: () => [
            area({ shape: new Rect(vec2(0), 16, 16) }),
            body({ isStatic: true }),
          ],
          1: () => [
            area({
              shape: new Rect(vec2(0), 8, 8),
              offset: vec2(4, 4),
            }),
            body({ isStatic: true }),
          ],
          2: () => [
            area({ shape: new Rect(vec2(0), 2, 16) }),
            body({ isStatic: true }),
          ],
          3: () => [
            area({
              shape: new Rect(vec2(0), 16, 20),
              offset: vec2(0, -4),
            }),
            body({ isStatic: true }),
          ],
        }
    }),
        ];
          for (const layer of map) {
    layer.use(scale(4));
    for (const tile of layer.children) {
      if (tile.type) {
        tile.play(tile.type);
      }
    }
  }
    
}