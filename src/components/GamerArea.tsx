import Images from "./ImageLoader";
import TextContent from "./TextContent";

export default class GameArea extends Phaser.Scene {
  y: number | undefined;
  constructor() {
    super("GameArea");
  }

  preload() {
    for (const key in Images) {
      this.load.image(key, Images[key]); // Preload images using the paths from ImageLoader.js
    }
  }

  create() {
    const scaleFactor = (this.game.config.width as number) / 1920; // Assuming the original width of the screen is 1920px

    // Add background image
    this.add
      .image(0, 0, "sky")
      .setOrigin(0)
      .setDisplaySize(
        this.game.config.width as number,
        this.game.config.height as number
      );

    this.add
      .image(150 * scaleFactor, 425 * scaleFactor, "bgs")
      .setScale(0.23 * scaleFactor);

    // Add coins and set interactive behaviors
    this.addCoin(150, 160, "coin1", scaleFactor);
    this.addCoin(150, 295, "coin2", scaleFactor);
    this.addCoin(150, 430, "coin3", scaleFactor);
    this.addCoin(150, 565, "coin4", scaleFactor);
    this.addCoin(150, 700, "coin5", scaleFactor);

    // Add header images with interactive behaviors
    this.addButton(
      1600,
      80,
      "instraction",
      this.showModal.bind(this),
      scaleFactor
    );
    this.addButton(
      1800,
      80,
      "profile",
      this.showModal1.bind(this),
      scaleFactor
    );
    this.addButton(
      1700,
      80,
      "settings",
      this.showModal2.bind(this),
      scaleFactor
    );

    // Add wheel image
    this.add
      .image(1000 * scaleFactor, 400 * scaleFactor, "wheel")
      .setScale(scaleFactor * 0.2);

    // Add cars and set interactive behaviors
    this.addCar(1000, 165, "car1", scaleFactor);
    this.addCar(1160, 230, "car2", scaleFactor);
    this.addCar(1235, 390, "car3", scaleFactor);
    this.addCar(1170, 550, "car4", scaleFactor);
    this.addCar(1000, 625, "car5", scaleFactor);
    this.addCar(835, 565, "car6", scaleFactor);
    this.addCar(765, 400, "car7", scaleFactor);
    this.addCar(830, 230, "car8", scaleFactor);

    // Add trends background and images
    this.add
      .image(1000 * scaleFactor, 815 * scaleFactor, "trendsbg")
      .setScale(scaleFactor * 0.22);
    this.add
      .image(470 * scaleFactor, 820 * scaleFactor, "trendName")
      .setScale(scaleFactor * 0.25);

    this.addCars(650, 818, "cars1", scaleFactor);
    this.addCars(750, 818, "cars2", scaleFactor);
    this.addCars(850, 818, "cars3", scaleFactor);
    this.addCars(950, 818, "cars4", scaleFactor);
    this.addCars(1050, 818, "cars5", scaleFactor);
    this.addCars(1150, 818, "cars6", scaleFactor);
    this.addCars(1250, 818, "cars7", scaleFactor);
    this.addCars(1350, 818, "cars8", scaleFactor);
    this.addCars(1450, 818, "cars1", scaleFactor);
    this.addCars(1550, 818, "cars2", scaleFactor);

    const remaining = this.add
      .image(570 * scaleFactor, 700 * scaleFactor, "remaining")
      .setScale(scaleFactor * 0.28)
      .setInteractive();
    // coin flow of multiple coin
    let intervalId: number | undefined; // Variable to store the interval ID
    // multiple to multiple coin flow
    remaining.on("pointerdown", () => {
      console.log("Clicked Coin");
      // Fixed destination positions
      const destinations = [
        { x: 1000 * scaleFactor, y: 150 * scaleFactor },
        { x: 1150 * scaleFactor, y: 220 * scaleFactor },
        { x: 1200 * scaleFactor, y: 380 * scaleFactor },
        { x: 1150 * scaleFactor, y: 550 * scaleFactor },
        { x: 950 * scaleFactor, y: 650 * scaleFactor },
        { x: 830 * scaleFactor, y: 550 * scaleFactor },
        { x: 750 * scaleFactor, y: 380 * scaleFactor },
        { x: 810 * scaleFactor, y: 220 * scaleFactor },
      ];

      // Array of coin images
      const coinImages = ["coin1", "coin2", "coin3", "coin4", "coin5"]; // Add more if needed

      // Function to start the animation
      const startAnimation = () => {
        intervalId = setInterval(() => {
          // Loop to emit multiple emitters
          for (let i = 0; i < 100; i++) {
            // Randomly select a destination
            const randomIndex = Phaser.Math.Between(0, destinations.length - 1);
            const dest = destinations[randomIndex];
            // Randomly select a coin image
            const randomCoinIndex = Phaser.Math.Between(
              0,
              coinImages.length - 1
            );
            const coinImage = coinImages[randomCoinIndex];
            // Create emitter for the random destination and coin image
            const emitter = this.add.particles(0, 0, coinImage, {
              x: { start: 1800 * scaleFactor, end: dest.x, ease: "sine.in" },
              y: { start: 100 * scaleFactor, end: dest.y },
              lifespan: 1000,
              frequency: 100,
              emitting: true,
              maxParticles: 1,
              scale: 0.1 * scaleFactor,
            });
            emitter.setSpeed(50);
            emitter.setAngle(2);
            emitter.start();
          }
        }, 200);
      };

      // Start the animation
      startAnimation();

      // Stop the animation after 20 seconds
      setTimeout(() => {
        clearInterval(intervalId);
      }, 20000);
    });
    // onle to multiple coin flow
    //   remaining.on("pointerdown", () => {
    //   console.log("Clicked Coin");
    //   // Fixed destination positions
    //   const destinations = [
    //     { x: 1000 * scaleFactor, y: 150 * scaleFactor },
    //     { x: 1150 * scaleFactor, y: 220 * scaleFactor },
    //     { x: 1200 * scaleFactor, y: 380 * scaleFactor },
    //     { x: 1150 * scaleFactor, y: 550 * scaleFactor },
    //     { x: 950 * scaleFactor, y: 650 * scaleFactor },
    //     { x: 830 * scaleFactor, y: 550 * scaleFactor },
    //     { x: 750 * scaleFactor, y: 380 * scaleFactor },
    //     { x: 810 * scaleFactor, y: 220 * scaleFactor },
    //   ];

    //   // Function to start the animation
    //   const startAnimation = () => {
    //     intervalId = setInterval(() => {
    //       // Loop to emit multiple emitters
    //       for (let i = 0; i < 100; i++) {
    //         // Randomly select a destination
    //         const randomIndex = Phaser.Math.Between(0, destinations.length - 1);
    //         const dest = destinations[randomIndex];

    //         // Create emitter for the random destination
    //         const emitter = this.add.particles(0, 0, "coin1", {
    //           x: { start: 1800 * scaleFactor, end: dest.x, ease: "sine.in" },
    //           y: { start: 100 * scaleFactor, end: dest.y },
    //           lifespan: 1000,
    //           frequency: 100,
    //           emitting: true,
    //           maxParticles: 1,
    //           scale: 0.1 * scaleFactor,
    //         });
    //         emitter.setSpeed(50);
    //         emitter.setAngle(2);
    //         emitter.start();
    //       }
    //     }, 200);
    //   };

    //   // Start the animation
    //   startAnimation();

    //   // Stop the animation after 20 seconds
    //   setTimeout(() => {
    //     clearInterval(intervalId);
    //   }, 20000);
    // });

    this.add
      .image(570 * scaleFactor, 690 * scaleFactor, "remainingtitle")
      .setScale(scaleFactor * 0.28);
    this.add
      .image(570 * scaleFactor, 718 * scaleFactor, "remainingborder")
      .setScale(scaleFactor * 0.28);
    const myRecords = this.add
      .image(1425 * scaleFactor, 700 * scaleFactor, "records")
      .setScale(scaleFactor * 0.28)
      .setInteractive();
    myRecords.on("pointerdown", () => {
      this.showModal3();
    });

    // Add  text contents
    this.addInstructionText(scaleFactor);
    this.addRemainingText(scaleFactor);
  }

  addCoin(
    x: number,
    y: number,
    key: string | Phaser.Textures.Texture,
    scaleFactor: number
  ) {
    const coin = this.add
      .image(x * scaleFactor, y * scaleFactor, key)
      .setScale(scaleFactor * 0.23);
    coin.setInteractive();

    coin.on("pointerdown", () => {
      console.log(`Image clicked ${key}`);
    });

    coin.on("pointerover", () => {
      coin.setScale(scaleFactor * 0.23 * 1.1);
    });

    coin.on("pointerout", () => {
      coin.setScale(scaleFactor * 0.23);
    });
  }

  addButton(
    x: number,
    y: number,
    key: string | Phaser.Textures.Texture,
    callback: Function,
    scaleFactor: number
  ) {
    const button = this.add
      .image(x * scaleFactor, y * scaleFactor, key)
      .setScale(scaleFactor * 0.22)
      .setInteractive();

    button.on("pointerdown", callback);
    button.on("pointerover", () => {
      button.setScale(scaleFactor * 0.23 * 1.1);
    });
    button.on("pointerout", () => {
      button.setScale(scaleFactor * 0.23);
    });
  }

  addCar(
    x: number,
    y: number,
    key: string | Phaser.Textures.Texture,
    scaleFactor: number
  ) {
    const carImage = this.add
      .image(x * scaleFactor, y * scaleFactor, key)
      .setScale(scaleFactor * 0.16);
    // carImage.postFX.addGlow(0xffff00, 4, 0, false, 0.1, 32);
    // const f2 =carImage.postFX.addGlow(0xff0000, 4, 2);
    const borderGraphics = this.add.graphics();
    borderGraphics.lineStyle(4, 0xffff00);
    const borderRadius = 150;
    borderGraphics.strokeRoundedRect(
      carImage.x - carImage.displayWidth / 2,
      carImage.y - carImage.displayHeight / 2,
      carImage.displayWidth,
      carImage.displayHeight,
      borderRadius
    );

    carImage.setInteractive();
    carImage.on("pointerdown", () => {
      console.log(`Car clicked ${key}`);
      const emitter = this.add.particles(0, 0, "coin1", {
        x: {
          start: 550 * scaleFactor,
          end: x * scaleFactor,
          ease: "sine.in",
        },
        y: { start: 700 * scaleFactor, end: y * scaleFactor },
        lifespan: 1000,
        frequency: 100,
        emitting: false,
        maxParticles: 1,
        scale: 0.09 * scaleFactor,
      });
      emitter.start();
    });
    carImage.on("pointerover", () => {
      carImage.setScale(scaleFactor * 0.16 * 1.05);
    });

    carImage.on("pointerout", () => {
      carImage.setScale(scaleFactor * 0.16);
    });
  }
  addCars(
    x: number,
    y: number,
    key: string | Phaser.Textures.Texture,
    scaleFactor: number
  ) {
    const winCars = this.add
      .image(x * scaleFactor, y * scaleFactor, key)
      .setScale(0.24 * scaleFactor);
    winCars.setInteractive();
    winCars.on("pointerover", () => {
      winCars.setScale(scaleFactor * 0.23 * 1.05);
    });

    winCars.on("pointerout", () => {
      winCars.setScale(scaleFactor * 0.23);
    });
  }

  addInstructionText(scaleFactor: number) {
    const textPositions = [
      { x: 990, y: 195 },
      { x: 1145, y: 260 },
      { x: 1220, y: 420 },
      { x: 1150, y: 580 },
      { x: 985, y: 655 },
      { x: 820, y: 595 },
      { x: 750, y: 430 },
      { x: 820, y: 260 },
    ];
    textPositions.forEach((pos) => {
      const instructions = this.add.text(
        pos.x * scaleFactor,
        pos.y * scaleFactor,
        TextContent.instructionText,
        {
          fontSize: 13 * scaleFactor,
          color: "#ffffff",
          fontStyle: "bold",
          align: "center",
        }
      );
      instructions.setOrigin(0.5 * scaleFactor);
    });
  }

  addRemainingText(scaleFactor: number) {
    const customX = 565;
    const customY = 718;

    const instructions = this.add.text(
      customX * scaleFactor,
      customY * scaleFactor,
      TextContent.remainingValues,
      {
        fontSize: 32 * scaleFactor,
        color: "#ffffff",
        fontStyle: "bold",
        align: "center",
      }
    );
    instructions.setOrigin(0.5);
  }

  showModal() {
    const scaleFactor = (this.game.config.width as number) / 1920; // Assuming the original width of the screen is 1920px

    // Create modal background image
    const modalBackground = this.add
      .image(400 * scaleFactor, 50 * scaleFactor, "instrctionmodel")
      .setOrigin(0);
    modalBackground.setScale(0.34 * scaleFactor);
    modalBackground.setDepth(1);

    // Create back button image
    const backButton = this.add
      .image(1200 * scaleFactor, 810 * scaleFactor, "backButton")
      .setScale(0.2 * scaleFactor);
    backButton.setDepth(2);

    // Enable input and handle click event on the back button
    backButton.setInteractive().on("pointerdown", () => {
      modalBackground.destroy();
      backButton.destroy();
      text.destroy();
      this.input.setDefaultCursor("auto");
    });
    this.input.setDefaultCursor("not-allowed");

    const graphics = this.make.graphics();

    graphics.fillStyle(0xffffff);
    graphics.fillRect(
      620 * scaleFactor,
      300 * scaleFactor,
      666 * scaleFactor,
      470 * scaleFactor
    );

    const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    const text = this.add
      .text(670 * scaleFactor, 330 * scaleFactor, TextContent.content, {
        lineSpacing: 8,
        fontFamily: "Arial",
        color: "#ff00e6",
        wordWrap: { width: 620 * scaleFactor },
      })
      .setDepth(3)
      .setScale(1.4 * scaleFactor);

    text.setMask(mask);

    //  The rectangle they can 'drag' within
    const zone = this.add
      .zone(
        620 * scaleFactor,
        330 * scaleFactor,
        666 * scaleFactor,
        470 * scaleFactor
      )
      .setOrigin(0)
      .setInteractive();

    zone.on(
      "pointermove",
      (pointer: { isDown: any; velocity: { y: number } }) => {
        if (pointer.isDown) {
          text.y += pointer.velocity.y / 10;

          text.y = Phaser.Math.Clamp(
            text.y,
            -100 * scaleFactor,
            320 * scaleFactor
          );
        }
      }
    );
  }

  showModal1() {
    const scaleFactor = (this.game.config.width as number) / 1920; // Assuming the original width of the screen is 1920px

    // Create modal background image
    const modalBackground = this.add
      .image(400 * scaleFactor, 50 * scaleFactor, "playermodel")
      .setOrigin(0);
    modalBackground.setScale(0.28 * scaleFactor);
    modalBackground.setDepth(1);

    // Create back button image
    const backButton = this.add
      .image(1200 * scaleFactor, 810 * scaleFactor, "backButton")
      .setScale(0.2 * scaleFactor);
    backButton.setDepth(2);

    // Enable input and handle click event on the back button
    backButton.setInteractive().on("pointerdown", () => {
      modalBackground.destroy();
      backButton.destroy();
      this.input.setDefaultCursor("auto");
    });
    this.input.setDefaultCursor("not-allowed");

    // profile
    const sprites = [];

    for (let i = 0; i < 50; i++) {
      sprites.push(
        this.add.sprite(0, 0, "frame").setDepth(2).setScale(0.3)
      );
    }
    // sprites.push(
    //   this.add.sprite(680, 425, "avatar").setDepth(1).setScale(0.17)
    // );
    Phaser.Actions.GridAlign(sprites, {
      width: 12,
      cellWidth: 120,
      cellHeight: 60,
      x: 16,
      y: 10
  });

    // const frame = this.add.image(680,420,"frame").setDepth(2).setScale(0.30)
    // const avatar =this.add.image(680,425,"avatar").setDepth(1).setScale(0.17)
    // const text =this.add.text(635,500,TextContent.remainingTitleText, {
    //   fontSize: 50 * scaleFactor,
    //   color: "#000",
    //   fontStyle: "bold",
    // }).setDepth(1).setScale(0.3)
  }



  showModal2() {
    const scaleFactor = (this.game.config.width as number) / 1920; // Assuming the original width of the screen is 1920px

    // Create modal background image
    const modalBackground = this.add
      .image(400 * scaleFactor, 50 * scaleFactor, "settingsmodel")
      .setOrigin(0);
    modalBackground.setScale(0.34 * scaleFactor);
    modalBackground.setDepth(1);
    // Create back button image
    const backButton = this.add
      .image(1200 * scaleFactor, 810 * scaleFactor, "backButton")
      .setScale(0.2 * scaleFactor);
    backButton.setDepth(2);
    // Enable input and handle click event on the back button
    backButton.setInteractive().on("pointerdown", () => {
      modalBackground.destroy();
      backButton.destroy();
      this.input.setDefaultCursor("auto");
    });

    // Disable input on objects behind the modal
    this.input.setDefaultCursor("not-allowed");
    console.log("Showing settings modal");
  }
  showModal3() {
    const scaleFactor = (this.game.config.width as number) / 1920; // Assuming the original width of the screen is 1920px
    // Create modal background image
    const modalBackground = this.add
      .image(400 * scaleFactor, 65 * scaleFactor, "myRecords")
      .setOrigin(0);
    modalBackground.setScale(0.67 * scaleFactor);
    modalBackground.setDepth(1);
    // Create back button image
    const backButton = this.add
      .image(1160 * scaleFactor, 780 * scaleFactor, "backButton")
      .setScale(0.2 * scaleFactor);
    backButton.setDepth(2);

    // Enable input and handle click event on the back button
    backButton.setInteractive().on("pointerdown", () => {
      modalBackground.destroy();
      backButton.destroy();
      this.input.setDefaultCursor("auto");
    });

    // Disable input on objects behind the modal
    this.input.setDefaultCursor("not-allowed");
    console.log("Showing settings modal");
  }
}
