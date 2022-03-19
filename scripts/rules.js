let game = {
    modeockMode: false,
    firstCard: null,
    secondCard: null,

    teams: [
        "astralis",
        "cloud9",
        "faze",
        "fnatic",
        "furia",
        "g2",
        "liquid",
        "navi",
        "nip",
        "vitality",
    ],

    cards: null,

    setCard: function(id) {
        let card = this.cards.filter(card => card.id === id)[0];

        console.log(card);

        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true
            this.lockMode = true;

            return true;
        }
    },

    checkMatch: function() {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;;
    },

    clearCards: function() {
        this.firstCard = null,
            this.secondCard = null,
            this.lockMode = false;
    },

    unflipCards: function() {
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver: function() {
        return this.cards.filter(card => !card.flipped).length == 0
    },


    createCard: function() {
        this.cards = [];

        this.teams.forEach((team) => {
            this.cards.push(this.createPair(team));
        });

        this.cards = this.cards.flatMap((pair) => pair);
        this.shuffle();
    },

    createPair: function(team) {
        return [{
                id: this.createId(team),
                icon: team,
                flipped: false,
            },
            {
                id: this.createId(team),
                icon: team,
                flipped: false,
            },
        ];
    },

    createId: function(team) {
        return team + parseInt(Math.random() * 1000);
    },

    shuffle: function(cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);

            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [
                this.cards[currentIndex],
                this.cards[randomIndex],
            ];
        }
    },
};