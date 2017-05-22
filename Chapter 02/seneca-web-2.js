'use strict'

var Seneca = require('seneca');
var Express = require('express');
var Web = require('seneca-web');
var seneca = Seneca();

seneca.add({role: 'api',cmd:'bagzina'}, function(args, done) {
     done(null, {bar:"Bagzina!"});
     });
     
var Routes = [{
     prefix: '/my-api',
     pin: 'role:api,cmd:*',
     map: {
          bagzina: {GET: true}
          }
     }];
     
 
var config = {
     routes: Routes,
     adapter: require('seneca-web-adapter-express'),
     context: Express()
};

 seneca.client()
.use(Web, config)
.ready(() => {
    var server = seneca.export('web/context')()
    server.listen('8080', () => {
        console.log('server started on: 8080')
    })
});
