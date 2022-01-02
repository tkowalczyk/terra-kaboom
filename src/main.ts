import k from './kaboom'
import * as spritesData from './sprites/dungeon.json'
import { IntroScene } from './scenes/introScene'

const {
    scene,
    go
} = k

const spritesGfx = new URL("./sprites/dungeon.png", import.meta.url)

k.loadSpriteAtlas(spritesGfx.href, spritesData)

scene('intro', IntroScene)

go('intro')