module.exports = function(){
    return {
        make_cards: function(){
            var cards = [];
            var numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k', 'a' ];
            var suits = ['h', 'c', 'd', 's'];
            // var current_card_index = 51;
            for (var i = 0; i < 13 ; i++) 
            {
                
                for (var j = 0; j < 4; j++) 
                {
                    var card = {val: numbers[i]};
                    card.suit = suits[j];
                    cards.push(card);
                };
            };
            return cards;
        },

        shuffle: function(array){
            var currentIndex = array.length, temporaryValue, randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) 
            {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;  
          }
          return array;
        }
    } //end of object    
}   // end of function