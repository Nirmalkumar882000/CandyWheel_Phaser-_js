import Images from "./ImageLoader";
import TextContent from "./TextContent";

export default class GameArea extends Phaser.Scene {
  constructor() {
    super("GameArea");
  }

  preload() {
    for (const key in Images) {
      this.load.image(key, Images[key]); // Preload images using the paths from ImageLoader.js
    }
  }

  create() {
    const scaleFactor = this.game.config.width / 1920; // Assuming the original width of the screen is 1920px

    // Add background image
    this.add
      .image(0, 0, "sky")
      .setOrigin(0)
      .setDisplaySize(this.game.config.width, this.game.config.height);

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
      .image(1000 * scaleFactor, 850 * scaleFactor, "trendsbg")
      .setScale(scaleFactor * 0.22);
    this.add
      .image(470 * scaleFactor, 860 * scaleFactor, "trendName")
      .setScale(scaleFactor * 0.25);

    this.addCars(650, 852, "cars1", scaleFactor);
    this.addCars(750, 852, "cars2", scaleFactor);
    this.addCars(850, 852, "cars3", scaleFactor);
    this.addCars(950, 852, "cars4", scaleFactor);
    this.addCars(1050, 852, "cars5", scaleFactor);
    this.addCars(1150, 852, "cars6", scaleFactor);
    this.addCars(1250, 852, "cars7", scaleFactor);
    this.addCars(1350, 852, "cars8", scaleFactor);
    this.addCars(1450, 852, "cars1", scaleFactor);
    this.addCars(1550, 852, "cars2", scaleFactor);

    const remaining =this.add
      .image(570 * scaleFactor, 725 * scaleFactor, "remaining")
      .setScale(scaleFactor * 0.28)
      .setInteractive();
      // coin flow of multiple coin
      let intervalId: number | undefined; // Variable to store the interval ID
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
        const coinImages = ["coin1", "coin2", "coin3","coin4","coin5"]; // Add more if needed
      
        // Function to start the animation
        const startAnimation = () => {
          intervalId = setInterval(() => {
            // Loop to emit multiple emitters
            for (let i = 0; i < 100; i++) {
              // Randomly select a destination
              const randomIndex = Phaser.Math.Between(0, destinations.length - 1);
              const dest = destinations[randomIndex];
              // Randomly select a coin image
              const randomCoinIndex = Phaser.Math.Between(0, coinImages.length - 1);
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

    this.add.image(570 * scaleFactor, 710 *scaleFactor, "remainingtitle").setScale(scaleFactor * 0.28);
    this.add.image(570 * scaleFactor, 743 * scaleFactor, "remainingborder").setScale(scaleFactor * 0.28);
    this.add
      .image(1425 * scaleFactor, 725 * scaleFactor, "records")
      .setScale(scaleFactor * 0.28)
      .setInteractive();

    // Add instruction text
    this.addInstructionText(scaleFactor);
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
    const borderGraphics = this.add.graphics();
    borderGraphics.lineStyle(4, 0xFFFF00);
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
      .setScale(0.23 * scaleFactor);
    winCars.setInteractive();
    winCars.on("pointerover", () => {
      winCars.setScale(scaleFactor * 0.23 * 1.05);
    });

    winCars.on("pointerout", () => {
      winCars.setScale(scaleFactor * 0.23);
    });

    


  }

  addInstructionText(scaleFactor: number) {
    const instructions = this.add.text(
      this.game.config.width / 2,
      this.game.config.height - 50,
      TextContent.instructions,
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
    // Implement code to show the instruction modal
    console.log("Showing instruction modal");
  }

  showModal1() {
    // Implement code to show the profile modal
    console.log("Showing profile modal");
  }

  showModal2() {
    // Implement code to show the settings modal
    console.log("Showing settings modal");
  }
}
