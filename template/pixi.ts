import * as PIXI from 'pixi.js';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const app = new PIXI.Application(SCREEN_WIDTH, SCREEN_HEIGHT, {backgroundColor : 0x000000});
document.body.appendChild(app.view);

const circle = new PIXI.Graphics();
circle.lineStyle(0);
circle.beginFill(0xDE3249, 1);
circle.drawCircle(0, 0, 50);
circle.endFill();

circle.x = app.screen.width / 2;
circle.y = app.screen.height / 2;

app.stage.addChild(circle);

app.ticker.add((delta):void => {
});

