import * as Phaser from 'phaser-ce';
import * as React from "react";

class Game extends React.Component {

    protected readonly config = {
        height: 600,
        // physics: {
        //     arcade: {
        //         debug: false,
        //         gravity: {y: 300},
        //     },
        //     default: 'arcade',
        // },
        // type: Phaser.AUTO,
        width: 800,


        // scene: {
        //     preload: preload,
        //     create: create,
        //     update: update
        // }
    };

    protected game: Phaser.Game;

    constructor(props: any) {
        super(props);

        this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
            create: this.create,
            preload: this.preload,
            update: this.update
        });
    }


    public preload() {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('star', 'assets/star.png');
        this.game.load.image('bomb', 'assets/bomb.png');
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }

    public create() {
        this.game.add.image(400, 300, 'sky');
    }

    public update(){
        // todo
    }

    public render(): React.ReactNode {
        return (
            <div/>
        );
    }
}

export default Game;
