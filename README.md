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
- then you can define your actors , use anywhere

## Usage

_when you finished install,you can do following things to use actor_

 you can define an actor in any component or service.like this:
 
 ```typescript
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actor, ActorService} from "ng2-actor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'ng2-electron-demo';
  appActor:Actor = null

  constructor(private $actor:ActorService){}

  ngOnInit(): void {
    this.$actor.create('first')
    this.appActor = this.$actor.start('demo',m=>{
      console.log(m.message)
    })
    this.appActor.sendByName('first','hi~first')
    setTimeout(()=>{this.appActor.sendByName('first','hi~first2')},2000)
  }

  ngOnDestroy(): void {
    this.$actor.stop(this.appActor.name)
  }

}
```

1. Inject `ActorService` using DI.
2. Create an Actor and give it a receiver function.
3. Send messages according to actor.
4. When the component destroy, you can `stop` or `pause` this actor.

It is so easy?Right?

## APIs

### Actor [Model Class]

#### Fields

- `.name` : a unique name for actor, required.
- `.state` : the actor's state, it has two value:`Actor.STATE_FOREGROUND` and `Actor.STATE_BACKGROUND`.
- `.backgroundMessageBox` : a message box for message cache when actor under the background state.Usually, you need not to access it.
- `.actorSystem` : ActorService's reference.

#### Methods

- `constructor(name:string,actorSystem:ActorService)`
- `receive(m:{message:any,sender:Actor,receiver:Actor})=>any` : Actor's message handler
- `sendByName(name:string,message:any)=>void`
- `send(actor:Actor,message:any)=>void`
- `forwardByName(name:string,msg:{message:any,sender:Actor,receiver:Actor})=>void` : forward method can give the message to another actor and keep the origin sender
- `forward(actor:Actor,msg:{message:any,sender:Actor,receiver:Actor})=>void`
- `broadcast(message:any)=>void` : can send a message to all actors, include itself
- `tell(message:any,sender:Actor)=>void` : let this actor receive a message with a sender. Usually, you should use sendXXX method to send message not this
- `become(receiver:(m:{message:any,sender:Actor,receiver:Actor})=>any)=>void` : change the actor's receive handler

### ActorService [Service Class]

#### Fields

- `.actors` : all the actors in this actor system

#### Method

- `create(name:string):Actor` : create an actor with a none receiver and background state in actor system. It can be used in prebuilt an actor and let it cache message during it not started
- `start(name:string,receiver:(m:{message:any,sender:Actor,receiver:Actor})=>any):Actor` : start an actor with a receiver by name and let this actor in foreground state
- `startActor(actor:Actor):Actor`
- `pause(name:string):void` : let this actor switch to background mode by name
- `stop(name:string):void` : remove the actor from this actor system by name

## About

[dowdyboy](http://dowdyboy.com)

[Github](https://github.com/dowdyboy/ng2-actor)
