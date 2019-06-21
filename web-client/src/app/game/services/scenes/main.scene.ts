import { Injectable } from '@angular/core';
import Player from '../../objects/player';

import { MapBuilder } from '../builder/map-builder';
import { GameRoomSocket } from '../communication/game-room.socket';
import { mapParser } from '../parser/map-parser';

// Types of player.
import { RemotePlayer } from '../../objects/remote-player';
import { LocalPlayer } from '../../objects/local-player';

@Injectable()
export class MainScene extends Phaser.Scene {

	/** Scene key. */
	public static readonly KEY = 'MainScene';

	private players: Player[] = [];
	
	private connection: GameRoomSocket;
	
	private builder: MapBuilder;

	private field: Phaser.Tilemaps.DynamicTilemapLayer;

	private obstacles: Phaser.Tilemaps.DynamicTilemapLayer;

	/** Says if the component has received data once. */
	private initialized = false;

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
		this.field = map.createDynamicLayer('field', tileset, 0, 0);
		this.obstacles = map.createDynamicLayer('obstacles', tileset, 0, 0);
		const shadows = map.createDynamicLayer('shadows', tileset, 0, 0);

		this.builder = new MapBuilder(map, this.obstacles, shadows);

		// Wait data.
		this.connection.feed$.subscribe(({ player, contest }) => {

			this.builder.drawData(mapParser(contest.battlefield));

			// Setup collisions.
			this.field.setCollisionByProperty({ collides: true });
			this.obstacles.setCollisionByProperty({ collides: true });

			this.matter.world.convertTilemapLayer(this.obstacles);
			this.matter.world.convertTilemapLayer(this.field);

			// Set player initial position.
			if (this.initialized) {

				contest.players.forEach(outputPlayer => {

					const player = this.players.find(p => p.id === outputPlayer.id);

					if (player && player instanceof RemotePlayer) {

						player.setServerPosition({
							x: outputPlayer.positionX,
							y: outputPlayer.positionY
						});
					}
				});

			} else {
				this.players = contest.players.map(p => {

					const position = {
						x: p.positionX,
						y: p.positionY
					};

					let phaserPlayer: Player;

					if (p.id === player.id) {
						phaserPlayer = new LocalPlayer(this, {
							id: p.id,

							initialPosition: position,

							movementOutput: ({ x, y }) => this.connection.move(x, y)
						});
					} else {

						phaserPlayer = new RemotePlayer(this, {
							id: p.id,
							initialPosition: position
						});
					}

					return phaserPlayer;
				});
			}

			this.initialized = true;
		});
	}

	update() {
		this.players.forEach(p => p.update());
	}

	/**
	 * Sets the connection.
	 * @param connection 
	 */
	setConnection(connection: GameRoomSocket) {
		this.connection = connection;
	}
}
