Vue.createApp({
  data() {
    return {
      playerHealthValue: 100,
      monsterHealthValue: 100,
      round: 0,
      winner: null,
      logMessages: [],
    };
  },
  methods: {
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
    surrender() {
      this.addLogMessage("player", "surrender", null);
      this.winner = "monster";
    },
    restartGame() {
      (this.playerHealthValue = 100),
        (this.monsterHealthValue = 100),
        (this.round = 0),
        (this.winner = null);
      this.logMessages = [];
    },
    attackMonster() {
      // formula to get a random amount between 12 and 5
      const damage = getRandValue(12, 5);
      this.monsterHealthValue -= damage;
      this.addLogMessage("player", "attack", damage);
      this.attackPlayer();
      this.round++;
    },
    attackPlayer() {
      // formula to get a random amount between 12 and 5
      const damage = getRandValue(8, 15);
      this.playerHealthValue -= damage;
      this.addLogMessage("monster", "attack", damage);
    },
    specialAttack() {
      const damage = getRandValue(10, 25);
      this.monsterHealthValue -= damage;
      this.addLogMessage("player", "attack", damage);

      this.attackPlayer();
      this.round++;
    },
    heal() {
      const healVal = getRandValue(5, 20);
      if (this.playerHealthValue + healVal > 100) {
        this.playerHealthValue = 100;
      } else {
        this.playerHealthValue += healVal;
      }
      this.addLogMessage("player", "heal", healVal);

      this.attackPlayer();
      this.round++;
    },
  },
  watch: {
    playerHealthValue(value) {
      if (value <= 0 && this.monsterHealthValue <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealthValue(value) {
      if (value <= 0 && this.playerHealthValue <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    playerBarStyle() {
      if (this.playerHealthValue > 0) {
        return { width: this.playerHealthValue + "%" };
      } else {
        return { width: "0%" };
      }
    },
    monsterBarStyle() {
      if (this.monsterHealthValue > 0) {
        return { width: this.monsterHealthValue + "%" };
      } else {
        return { width: "0%" };
      }
    },
    resultString() {
      if (this.winner === "monster") {
        return `You Lost!`;
      } else if (this.winner === "player") {
        return `You Won!`;
      } else if (this.winner === "draw") {
        return `It's a Draw!`;
      }
    },
  },
}).mount("#game");

function getRandValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
