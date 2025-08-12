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

}