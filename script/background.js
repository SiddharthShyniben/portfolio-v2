const canvas = document.querySelector('#background');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 5;

let balls = [];

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const clamp = x => scaleBetween(x, 0, 1, 0.95, 7);

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
	return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

for (let i = 0; i < random(3, 4); i++) {
	balls.push({
		x: random(0, canvas.width),
		y: random(0, canvas.height),
		dx: random(1, 5),
		dy: random(1, 5),
		radius: random(14, 18)
	})
}

console.log(balls, canvas.width / CELL_SIZE, canvas.height / CELL_SIZE);

function resize() {
	canvas.width = window.innerWidth + 100;
	canvas.height = window.innerHeight + 100;
}

window.addEventListener('resize', resize)
resize();

ctx.fillStyle = 'black';

function draw() {
	let yCells = ~~(canvas.height / CELL_SIZE);
	let xCells = ~~(canvas.width / CELL_SIZE);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let y = 0; y < yCells; y++) {
		for (let x = 0; x < xCells; x++) {
			const o = balls
				// .filter(ball => distance(ball.x, ball.y, x, y) < ball.radius * 10)
				.map(ball => ball.radius / Math.sqrt((x - ball.x) ** 2 + (y - ball.y) ** 2))
				.reduce((a, b) => a + b, 0);
			if (o > 0.95) {
				ctx.fillStyle = `rgba(65, 72, 104, ${125 * clamp(o)})`
				ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
			} 
		}
	}
	
	balls = balls.map(b => {
		const ret = {...b, x: b.x + b.dx, y: b.y + b.dy};
		if (ret.x <= 0) {
			ret.dx = Math.abs(ret.dx);
		}
		
		if (ret.x >= ~~(canvas.width / CELL_SIZE)) {
			ret.dx = -Math.abs(ret.dx)
		}
		
		if (ret.y <= 0) {
			ret.dy = Math.abs(ret.dy);
		}
		
		if (ret.y >= ~~(canvas.height / CELL_SIZE)) {
			ret.dy = -Math.abs(ret.dy)
		}
		
		return ret;
	});
}

setInterval(draw, 100)
