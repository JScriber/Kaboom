import { Injectable } from '@angular/core';

import { MapBuilder } from '../builder/map-builder';
import { GameRoomSocket } from '../communication/game-room.socket';
import { mapParser } from '../parser/map-parser';

// Types of player.
import { RemotePlayer } from '../../objects/remote-player';
import { LocalPlayer } from '../../objects/local-player';
import Player from '../../objects/player';

import { SpriteSkin } from './main.scene.model';

// Communication models.
import { RunningContest } from '../communication/models/running-contest.model';
import { Player as CommunicationPlayer } from '../communication/models/player.model';

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

		// Load the players.
		const frameConfig: Phaser.Loader.FileTypes.ImageFrameConfig = {
			frameHeight: 25,
			frameWidth: 16
		};

		this.load.spritesheet(SpriteSkin.Player1, 'assets/game/players/1.png', frameConfig);
		this.load.spritesheet(SpriteSkin.Player2, 'assets/game/players/2.png', frameConfig);
		this.load.spritesheet(SpriteSkin.Player3, 'assets/game/players/3.png', frameConfig);
		this.load.spritesheet(SpriteSkin.Player4, 'assets/game/players/4.png', frameConfig);
  }

  create() {

    const map = this.make.tilemap({ key: 'map', tileHeight: 16, tileWidth: 16 });
		const tileset = map.addTilesetImage('wood-level', 'map-tileset');

		// Layers.
		this.field = map.createDynamicLayer('field', tileset, 0, 0);
		this.obstacles = map.createDynamicLayer('obstacles', tileset, 0, 0);
		const shadows = map.createDynamicLayer('shadows', tileset, 0, 0);

		console.log(map.widthInPixels, map.width, map.widthInPixels / map.width);

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
			this.initialized ? this.updatePositions(contest) : this.initialize(contest, player);

			this.initialized = true;
		});

		this.connection.ready();
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

	/**
	 * Updates the position of the players based on the one on the server.
	 * @param {RunningContest} contest
	 */
	private updatePositions(contest: RunningContest) {
		contest.players.forEach(outputPlayer => {

			const player = this.players.find(p => p.id === outputPlayer.id);

			if (player && player instanceof RemotePlayer) {

				player.setServerPosition({
					x: outputPlayer.positionX,
					y: outputPlayer.positionY
				});
			}
		});
	}

	/**
	 * Initializes the state of the game.
	 * @param contest
	 * @param player
	 */
	private initialize(contest: RunningContest, player: CommunicationPlayer) {
		this.players = contest.players.map(p => {

			const position = {
				x: p.positionX,
				y: p.positionY
			};

			const skin = p.skin;

			let phaserPlayer: Player;

			if (p.id === player.id) {
				phaserPlayer = new LocalPlayer(this, {
					id: p.id,
					skin,

					initialPosition: position,

					connection: this.connection
				});
			} else {

				phaserPlayer = new RemotePlayer(this, {
					id: p.id,
					initialPosition: position,
					skin
				});
			}

			return phaserPlayer;
		});
	}
}
