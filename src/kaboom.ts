import kaboom from 'kaboom'

export const k = kaboom({
	scale: 2,
    canvas: document.querySelector("#game-canvas"),
    background: [0, 0, 0, ]
})

export default k