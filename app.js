var http = require('http');
var fs = require('fs');
var io = require('socket.io');
var current_card_index = 51
//////////////////make the playing cards///////////////////
var dealer_maker = require('dealer.js');  
var dealer = dealer_maker();
var cards = dealer.shuffle(dealer.make_cards());
////////////////////do node stuff///////////////////////////
server = http.createServer(function (request, response){
    if(request.url === '/index.html') 
    {
        response.writeHead(200, {'Content-type': 'text/html'});
        fs.readFile('index.html', 'utf8', function (errors, contents){
            response.write(contents); 
            response.end();
        });
    }
    else if(request.url === '/style.css')
    {
      fs.readFile('style.css', 'utf8', function (errors, contents){
      response.write(contents);
      response.end();
      });
    }
    else
    {
      response.end('File not found!!!');
    }
  });
//have socket io listen to server
var sockets = io.listen(server);
//listening to connection event this is like jquery document.ready()
sockets.on('connection', function (socket){
    //listening to send message event
    socket.on('deal_me_in', function (message){
        var deal_cards = [cards[current_card_index], cards[current_card_index - 1], cards[current_card_index-2], cards[current_card_index - 3]];
        socket.emit('give_two_cards', deal_cards);
        current_card_index -= 4;
        socket.emit('cards_left', current_card_index + 1)
        console.log('#############DEAL ME IN BITCHES####################');
  });

  socket.on('hit_me', function (message){
    //trigger display message event in all open sockets
    var hit_card = cards[current_card_index];
    socket.emit('hit_card', hit_card);
    current_card_index -= 1;
    socket.emit('cards_left', current_card_index + 1)
    console.log('################hit card received#####################');
  });

  socket.on('stay', function (){
    //trigger display message event in all open sockets
    console.log('player wants to stay');  
  });


  socket.on('new_deck', function (){
    cards = dealer.make_cards();
    cards = dealer.shuffle(cards);
    current_card_index = 51;
    socket.emit('cards_left', current_card_index + 1);
  });

  socket.on('need_total', function(){
    socket.emit('cards_left', current_card_index + 1);
  })

  socket.on('dealer_hit', function (){
    //trigger display message event in all open sockets
    var hit_card = cards[current_card_index];
    current_card_index -= 1;
    socket.emit('card_to_dealer', hit_card);
    socket.emit('cards_left', current_card_index + 1)
  });

});
server.listen(8080);
console.log('Server running in localhost port 8080')