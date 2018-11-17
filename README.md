# Ng2Actor

Ng2Actor is an implement for angular2 or greater.
It makes message exchange more easier between components or services in angular.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Feature

-  you can defined any actor in anywhere
- support broadcast messages
- support forward messages
- support foreground and background mode(foreground mode will handle the message right now , background mode will save message in actor's message box)
- very simple to use

## Install

- run `npm i -S ng2-actor` in your project
- import `Ng2ActorModule` to your `AppModule`'s `imports` field
- define your actors , use anywhere