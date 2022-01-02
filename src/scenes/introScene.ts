import k from '../kaboom'

export function IntroScene() {

    const SPEED = 120

    k.addLevel([
        "xxxxxxxxxx",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
        "          ",
    ], {
        width: 16,
        height: 16,
        " ": () => [
            sprite("floor"),
        ],
    })

    const map = k.addLevel([
        "tttttttttt",
        "cwwwwwwwwd",
        "l        r",
        "l        r",
        "l        r",
        "l      $ r",
        "l        r",
        "l $      r",
        "attttttttb",
        "wwwwwwwwww",
    ], {
        width: 16,
        height: 16,
        "$": () => [
            sprite("chest"),
            area(),
            solid(),
            { opened: false, },
            "chest",
        ],
        "a": () => [
            sprite("wall_botleft"),
            area({ width: 4 }),
            solid(),
        ],
        "b": () => [
            sprite("wall_botright"),
            area({ width: 4, offset: vec2(12, 0) }),
            solid(),
        ],
        "c": () => [
            sprite("wall_topleft"),
            area(),
            solid(),
        ],
        "d": () => [
            sprite("wall_topright"),
            area(),
            solid(),
        ],
        "w": () => [
            sprite("wall"),
            area(),
            solid(),
        ],
        "t": () => [
            sprite("wall_top"),
            area({ height: 4, offset: vec2(0, 12) }),
            solid(),
        ],
        "l": () => [
            sprite("wall_left"),
            area({ width: 4, }),
            solid(),
        ],
        "r": () => [
            sprite("wall_right"),
            area({ width: 4, offset: vec2(12, 0) }),
            solid(),
        ],
    })

    const player = add([
        pos(map.getPos(2, 2)),
        sprite("hero", { anim: "idle" }),
        area({ width: 12, height: 12, offset: vec2(0, 6) }),
        solid(),
        "center",
    ])

    const ogre = add([
        sprite("ogre"),
        pos(map.getPos(4, 4)),
        "bot",
        area({ scale: 0.5 }),
        solid(),
    ])

    onKeyPress("space", () => {

        every("chest", (c) => {
            if (player.isTouching(c)) {
                if (c.opened) {
                    c.play("close")
                    c.opened = false
                } else {
                    c.play("open")
                    c.opened = true
                }
            }
        })
    })

    player.onUpdate(() => {
        camPos(player.pos)
    })

    onKeyDown("right", () => {
        player.flipX(false)
        player.move(SPEED, 0)
    })

    onKeyDown("left", () => {
        player.flipX(true)
        player.move(-SPEED, 0)
    })

    onKeyDown("up", () => {
        player.move(0, -SPEED)
    })

    onKeyDown("down", () => {
        player.move(0, SPEED)
    })

    onKeyPress(["left", "right", "up", "down"], () => {
        player.play("run")
    })

    onKeyRelease(["left", "right", "up", "down"], () => {
        if (
            !isKeyDown("left")
            && !isKeyDown("right")
            && !isKeyDown("up")
            && !isKeyDown("down")
        ) {
            player.play("idle")
        }
    })

}