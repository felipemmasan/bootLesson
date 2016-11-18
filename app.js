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
var model = 'https://api.projectoxford.ai/luis/v2.0/apps/5863eacb-3c6f-458c-ba56-6b8490d16afc?subscription-key=1a3408edc7d04918ade50b6b0e96a11b';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

dialog.matches('Saudacao', [
    function (session, args, next) {
		session.beginDialog('/askName');
		//session.beginDialog('/ensureProfile', session.userData.profile);
    },
    function (session, results) {
        session.send('Ola %s!', results.response);
        session.send('Como posso te ajudar?');
    }
]);

bot.dialog('/askName', [
    function (session) {
        builder.Prompts.text(session, 'Ola! Como voce gosta de ser chamado?');
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);