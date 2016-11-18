var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.PORT || 3000, function()
{
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({appId: 'c0d8fc91-5c91-4f44-ab4b-0ab1060b658e', appPassword: '9BxkRdSRF5N1uD8bkcd0PFh'});
var bot = new builder.UniversalBot(connector);
server.post('/API/Messages', connector.listen());

bot.dialog('/', function(session){
    session.send("Olá")
});