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
        "                   ",
        " 455555555555555556",
        " 822222222222222229",
        " 822222222222222229",
        " 822222222222222229",
        " 822abbbc2222222229",
        " abbefffg2222222229",
        " ef3f22222222222229",
        " 111122222222222229",
        " 111122222222222229",
        " 222222277777777777",
        " 7777777           ",
        "                   ",
        "h     h     h      ",
        "h     h            ",
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
        "                   ",
        " 1212              ",
        " 3434              ",
        "          0  0     ",
        "    0 0   00 0     ",
        "            0      ",
        "     12    0 0 0   ",
        " 5   34     0      ",
        " 6                 ",
        "                   ",
        "                   ",
        "                   ",
        "                   "

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
        "0000000000000000000",
        "111               0",
        "0                 0",
        "0                 0",
        "0                 0",
        "0   2    2        0",
        "0   233332        0",
        "333331            0",
        "01                0",
        "0                 0",
        "0                 0",
        "0      000000000000",
        "0000000             "

    ],{
        tileWidth: 16,
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
    };
    k.add([
        sprite("mini-mons"),
        area(),
        body({ isStatic: true }),
        pos(1100, 500),
        scale(4),
        "cat",
    ]);

    const spiderMon = k.add([
        sprite("mini-mons"),
        area(),
        body({ isStatic: true }),
        pos(120, 480),
        scale(4),
        "spider",
    ]);
    spiderMon.play("spider");
    spiderMon.flipX = true;

    const centipedeMon = k.add([
        sprite("mini-mons"),
        area(),
        body({ isStatic: true }),
        pos(100, 200),
        scale(4),
        "centipede",
    ]);
    centipedeMon.play("centipede");

    const grassMon = k.add([
        sprite("mini-mons"),
        area(),
        body({ isStatic: true }),
        pos(700, 470),
        scale(4),
        "grass",
    ]);
    grassMon.play("grass");
    k.add([
        sprite("npc"),
        scale(4),
        pos(600, 200),
        area(),
        body({ isStatic: true }),
        "npc",
    ]);

    const player = k.add([
        sprite('player-down'),
        pos(500,200),
        scale(4),
        area(),
        body(),
        {
            currentSprite: 'player-down',
            speed: 300,
            isInDialogue: false
        }

    ]);
    let tick = 0;
    k.onUpdate(() => {
        camPos(player.pos);
        tick++;
        if (
        (isKeyDown("down") || isKeyDown("up")) &&
        tick % 20 === 0 &&
        !player.isInDialogue
        ) {
        player.flipX = !player.flipX;
        }
    });
    function setSprite(player, spriteName) {
        if (player.currentSprite !== spriteName) {
        player.use(sprite(spriteName));
        player.currentSprite = spriteName;
        }
    }

    k.onKeyDown("down", () => {
        if (player.isInDialogue) return;
        setSprite(player, "player-down");
        player.move(0, player.speed);
    });

    k.onKeyDown("up", () => {
        if (player.isInDialogue) return;
        setSprite(player, "player-up");
        player.move(0, -player.speed);
    });

    k.onKeyDown("left", () => {
        if (player.isInDialogue) return;
        player.flipX = false;
        if (player.curAnim() !== "walk") {
        setSprite(player, "player-side");
        player.play("walk");
        }
        player.move(-player.speed, 0);
    });

    k.onKeyDown("right", () => {
        if (player.isInDialogue) return;
        player.flipX = true;
        if (player.curAnim() !== "walk") {
        setSprite(player, "player-side");
        player.play("walk");
        }
        player.move(player.speed, 0);
    });

    k.onKeyRelease("left", () => {
        player.stop();
    });

    k.onKeyRelease("right", () => {
        player.stop();
    });
    if(!worldState){
        worldState = {
            playerPos : player.pos,
            faintedMons : [],
        };
    }
    player.pos = k.vec2(worldState.playerPos);
    for(const faintedMons of worldState.faintedMons){
        k.destroy(k.get(faintedMons));
    }
    player.onCollide('npc', () => {
        player.isInDialogue = true;
        const dialogueBoxFixedContainer = k.add([k.fixed()]);
        const dialogueBox = dialogueBoxFixedContainer.add([
            k.rect(1000,200),
            k.outline(5),
            k.pos(150, 500),
            k.fixed()
        ])
        const dialogue = "Defeat all the monsters on this land and you'll become the champion!";
        const content = dialogueBox.add([
            k.text('',{
                size: 42,
                width: 900,
                lineSpacing: 15,
            }),
            k.color(10,10,10),
            k.pos(40,30),
            k.fixed(),
        ]);
        if(worldState.faintedMons < 4){
            content.text = dialogue;
        }else{
            content.text = "You're the champion";
        }
        k.onUpdate(() => {
            if(isKeyDown('space')){
                k.destroy(dialogueBox);
                player.isInDialogue = false;
            }
        })

    })

}