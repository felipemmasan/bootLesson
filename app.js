//Inicialização de objetos
var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.PORT || 3000, function()
{
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({appId: 'c0d8fc91-5c91-4f44-ab4b-0ab1060b658e', appPassword: '9BxkRdSRF5N1uD8bkcd0PFh'});
var bot = new builder.UniversalBot(connector);

//Inicializa o serviço
server.post('/API/Messages', connector.listen());

// Variaveis do LUIS
var model = 'https://api.projectoxford.ai/luis/v2.0/apps/2023e692-04f0-4ff9-819c-4b6ab8817762?subscription-key=428f032ee4454a6aa9d09106822c93c9&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

bot.dialog('/askName', [
    function (session) {

        if(session.message.user.name != null){
            session.send('Ola ' + session.message.user.name + ', como posso lhe ajudar?');
        }else{
            session.send('Ola, como posso lhe ajudar?');
        }

        //session.send('Ola ' + session.message.user.name + ', como posso lhe ajudar?');
        
        session.endDialog();
    }
]);

bot.dialog('/listarProdutos', [
    function(session, args, next){
        session.send('Temos os seguintes produtos:');
        session.send(new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://massasfavoritta.com.br/images/res_img_2.jpg",
                text: "Massas de Pastel"
            }]));

        session.send(new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://massasfavoritta.com.br/images/res_img_4.jpg",
                text: "Massas Doces"
            }]));
        session.endDialog();
    }
]);

dialog.matches('saudacao', [
    function (session, args, next) {
		session.beginDialog('/askName');
    }
]);

dialog.matches('listarProdutos','/listarProdutos');

dialog.onDefault(
        builder.DialogAction.send("Desculpe, nao entendi...")
);