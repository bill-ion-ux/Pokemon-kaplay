import k from "./main.js";

function setWorld(worldState){
    function makeTile(type){
        return [
            sprite('tile'),
            {type},
        ]
    }
    const map = [
        k.addLevel([
        "45555555555555556",
        "8222222222222229",
        "8222222222222229",
        "8222222222222229",
        "822abbbc22222229",
        "abbefffg222222229",
        "ef3f22222222222229",
        "11112222222222229",
        "11112222222222229",
        "22222777777777777",
        "7777777",
        "       ",
        "h     h     h",
        "h     h",
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
        "1, 2, 1, 2,               ",
        "3, 4, 3, 4,           ",
        "            0,   0        ",
        "            0, 0,   0, 0  ",
        "                0         ",
        "       1,2,     1   ",
        "5,     3,4,     1      ",
        "6                        ",
        "                          ",
        "                          ",
        "                          ",
        "                          ",
        "                          ",
        "                          ",
        "                          ",
        "                          "

        ],{
            tileWidth: 16,
            tileHeight: 16,
            tiles: {
            0: () => makeTile(),
            1: () => makeTile("bigtree-pt1"),
            2: () => makeTile("bigtree-pt2"),
            3: () => makeTile("bigtree-pt3"),
            4: () => makeTile("bigtree-pt4"),
            5: () => makeTile("tree-t"),
            6: () => makeTile("tree-b"),
        },

        })
        ];
}