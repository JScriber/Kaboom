import { Injectable } from '@angular/core';
import Player from '../../objects/player';

import { MapBuilder } from '../builder/map-builder';

@Injectable()
export class MainScene extends Phaser.Scene {

	/** Scene key. */
	public static readonly KEY = 'MainScene';

  private player: Player;

  constructor() {
    super({ key: MainScene.KEY });
  }

	preload() {
		this.load.image('map-tileset', 'assets/game/levels/wood-level/tileset.jpg');
		this.load.tilemapTiledJSON('map', 'assets/game/levels/wood-level/representation.json');
		
		this.load.spritesheet('player1', 'assets/game/players/1.png', {
			frameHeight: 25,
			frameWidth: 16
		});
  }

  create() {

    const map = this.make.tilemap({ key: 'map', tileHeight: 16, tileWidth: 16 });
		const tileset = map.addTilesetImage('wood-level', 'map-tileset');

		// Layers.
		const field = map.createDynamicLayer('field', tileset, 0, 0);
		const obstacles = map.createDynamicLayer('obstacles', tileset, 0, 0);
		const shadows = map.createDynamicLayer('shadows', tileset, 0, 0);

		const builder = new MapBuilder(map, obstacles, shadows);

		builder.drawData([
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 8, 0, 8, 0, 0, 0],
			[0, 0, 0, 0, 8, 0, 0, 8, 0, 0, 0],
			[0, 0, 2, 7, 8, 8, 0, 8, 8, 8, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 1],
		]);

		// Setup collisions.
		field.setCollisionByProperty({ collides: true });
		obstacles.setCollisionByProperty({ collides: true });

		this.matter.world.convertTilemapLayer(obstacles);
		this.matter.world.convertTilemapLayer(field);

		this.player = new Player(this, 100, 30);
	}

	update() {
		this.player.update();
	}
}
