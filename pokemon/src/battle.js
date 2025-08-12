import k from "./main.js";


export function setBattle(worldState){
    k.add([
        k.sprite('battle-background'),
        k.scale(1.3),
        k.pos(0,0),
    ])
    
    const enemyMon = k.add([
        k.sprite(worldState.enemyName + '-mon'),
        k.scale(5),
        k.pos(1300,100),
        k.opacity(1),
        {
            fainted: false
        }
    ])
    enemyMon.flipX = true;
    k.tween(
        enemyMon.pos.x,
        1000,
        0.3,
        (val) => enemyMon.pos.x = val, 
        k.easings.easeInSine
    )
    const playerMon = k.add([
        k.sprite('mushroom-mon'),
        k.scale(8),
        k.pos(-100,300),
        k.opacity(1),
        {
            fainted: false
        }
    ])

    k.tween(
        playerMon.pos.x,
        300,
        0.3,
        (val) => playerMon.pos.x = val, 
        k.easings.easeInSine
    )
    const playerMonHealthBox = add([k.rect(400, 100), k.outline(4), k.pos(1000, 400)]);

    playerMonHealthBox.add([
        k.text("MUSHROOM", { size: 32 }),
        k.color(10, 10, 10),
        k.pos(10, 10),
    ]);

    playerMonHealthBox.add([rect(370, 10), color(200, 200, 200), pos(15, 50)]);

    const playerMonHealthBar = playerMonHealthBox.add([
        k.rect(370, 10),
        k.color(0, 200, 0),
        k.pos(15, 50),
    ]);

    k.tween(
        playerMonHealthBox.pos.x,
        850,
        0.3,
        (val) => (playerMonHealthBox.pos.x = val),
        easings.easeInSine
    );
      const enemyMonHealthBox = add([rect(400, 100), outline(4), pos(-100, 50)]);

    enemyMonHealthBox.add([
        k.text(worldState.enemyName.toUpperCase(), { size: 32 }),
        k.color(10, 10, 10),
        k.pos(10, 10),
    ]);

    enemyMonHealthBox.add([k.rect(370, 10), k.color(200, 200, 200), k.pos(15, 50)]);

    const enemyMonHealthBar = enemyMonHealthBox.add([
        k.rect(370, 10),
        k.color(0, 200, 0),
        k.pos(15, 50),
    ]);

    tween(
        enemyMonHealthBox.pos.x,
        100,
        0.3,
        (val) => (enemyMonHealthBox.pos.x = val),
        easings.easeInSine
    );
    const box = add([k.rect(1300, 300), k.outline(4), k.pos(-2, 530)]);
    const content = box.add([
        k.text("MUSHROOM is ready to battle!", { size: 42 }),
        k.color(10, 10, 10),
        k.pos(20, 20),
    ]);
    function reduceHealth(healthBar, damageDealt) {
        k.tween(
        healthBar.width,
        healthBar.width - damageDealt,
        0.5,
        (val) => (healthBar.width = val),
        easings.easeInSine
        );
    }

    function makeMonFlash(mon) {
        k.tween(
        mon.opacity,
        0,
        0.3,
        (val) => {
            mon.opacity = val;
            if (mon.opacity === 0) {
            mon.opacity = 1;
            }
        },
        easings.easeInBounce
        );
    }
    let phase = "player-selection";
    k.onKeyPress("space", () => {
        if (playerMon.fainted || enemyMon.fainted) return;

        if (phase === "player-selection") {
            content.text = "> Tackle";
            phase = "player-turn";
        return;
        }

        if (phase === "enemy-turn") {
            content.text = worldState.enemyName.toUpperCase() + " attacks!";
            const damageDealt = Math.random() * 230;

        if (damageDealt > 150) {
            content.text = "It's a critical hit!";
        }

        reduceHealth(playerMonHealthBar, damageDealt);
        makeMonFlash(playerMon);

        phase = "player-selection";
        return;
        }

        if (phase === "player-turn") {
            const damageDealt = Math.random() * 230;

        if (damageDealt > 150) {
            content.text = "It's a critical hit!";
        } else {
            content.text = "MUSHROOM used tackle.";
        }

        reduceHealth(enemyMonHealthBar, damageDealt);
        makeMonFlash(enemyMon);

        phase = "enemy-turn";
        }
    });
    function colorizeHealthBar(healthBar) {
        if (healthBar.width < 200) {
        healthBar.use(k.color(250, 150, 0));
        }
        if (healthBar.width < 100) {
        healthBar.use(k.color(200, 0, 0));
        }
    }

    function makeMonDrop(mon) {
        k.tween(mon.pos.y, 800, 0.5, (val) => (mon.pos.y = val), easings.easeInSine);
    }

    k.onUpdate(() => {
        colorizeHealthBar(playerMonHealthBar);
        colorizeHealthBar(enemyMonHealthBar);

        if (enemyMonHealthBar.width < 0 && !enemyMon.fainted) {
            makeMonDrop(enemyMon);
            content.text = worldState.enemyName.toUpperCase() + " fainted!";
            enemyMon.fainted = true;
            setTimeout(() => {
                content.text = "MUSHROOM won the battle!";
            }, 1000);
            setTimeout(() => {
                worldState.faintedMons.push(worldState.enemyName);
                k.go("world", worldState);
            }, 2000);
        }

        if (playerMonHealthBar.width < 0 && !playerMon.fainted) {
            makeMonDrop(playerMon);
            content.text = "MUSHROOM fainted!";
            playerMon.fainted = true;
            setTimeout(() => {
                content.text = "You rush to get MUSHROOM healed!";
            }, 1000);
            setTimeout(() => {
                worldState.playerPos = k.vec2(500, 700);
                k.go("world", worldState);
            }, 2000);
        }
    });



}