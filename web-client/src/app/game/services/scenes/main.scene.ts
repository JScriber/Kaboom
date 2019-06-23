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

		this.builder = new MapBuilder(map, this.obstacles, shadows);

		// Wait data.
		this.connection.feed$.subscribe(({ player, contest }) => {

			const { battlefield } = contest;

			// Draw the battlefield layout.
			this.builder.drawData(mapParser(battlefield));

			// Draw the bombs.
			this.builder.drawBombs(battlefield.bombs);

			// Setup collisions.
			this.field.setCollisionByProperty({ collides: true });
			this.obstacles.setCollisionByProperty({ collides: true });

			this.matter.world.convertTilemapLayer(this.obstacles);
			this.matter.world.convertTilemapLayer(this.field);

			// Update the players.
			this.updatePlayers(contest, player);

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
	 * Initializes the state of the game.
	 * @param contest
	 * @param player
	 */
	private updatePlayers(contest: RunningContest, current: CommunicationPlayer) {

		// Check removal.
		contest.players.filter(p => !p.connected).forEach(({ id }) => {
			const player = this.players.find(p => p.id === id);

			if (player && player instanceof RemotePlayer) {
				player.disconnect();
			}
		});

		// Create or update.
		this.players = contest.players.filter(p => p.connected)
			.map(outputPlayer => {

				let player = this.players.find(p => p.id === outputPlayer.id);

				if (player) {
					if (player instanceof RemotePlayer) {

						player.setServerPosition({
							x: outputPlayer.positionX,
							y: outputPlayer.positionY
						});
					}
				} else {
					player = this.createPlayer(outputPlayer, outputPlayer.id === current.id);
				}

				return player;
			});
	}

	/**
	 * Creates a new player.
	 * @param {Player} outputPlayer
	 * @param {boolean} localPlayer
	 * @returns a new player.
	 */
	private createPlayer(outputPlayer: CommunicationPlayer, localPlayer: boolean) {
		const position = {
			x: outputPlayer.positionX,
			y: outputPlayer.positionY
		};

		const skin = outputPlayer.skin;

		return (localPlayer) ? (
			new LocalPlayer(this, {
				id: outputPlayer.id,
				skin,

				initialPosition: position,

				connection: this.connection
			})
		) : (
			new RemotePlayer(this, {
				id: outputPlayer.id,
				initialPosition: position,
				skin
			})
		);
	}
}
