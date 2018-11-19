import {Inject, Injectable, InjectionToken} from '@angular/core';

export class Actor {

  static STATE_FOREGROUND = 'foreground'
  static STATE_BACKGROUND = 'background'

  name:string = null
  state:string = Actor.STATE_BACKGROUND
  backgroundMessageBox:{message:any,sender:Actor,receiver:Actor}[] = []
  actorSystem:ActorService = null

  constructor(name:string,actorSystem:ActorService){
    this.name = name
    this.actorSystem = actorSystem
  }

  receive:(m:{message:any,sender:Actor,receiver:Actor})=>any = ()=>{}

  sendByName(name:string,message:any){
    if(this.actorSystem != null) this.actorSystem.actors.filter(a=>a.name == name).forEach(a=>a.tell(message,this))
    else console.warn("you try to send message when actor stopped or on pause state")
  }

  send(actor:Actor,message:any){
    this.sendByName(actor.name,message)
  }

  forwardByName(name:string,msg:{message:any,sender:Actor,receiver:Actor}){
    if(this.actorSystem != null) this.actorSystem.actors.filter(a=>a.name == name).forEach(a=>a.tell(msg.message,msg.sender))
    else console.warn("you try to forward message when actor stopped or on pause state")
  }

  forward(actor:Actor,msg:{message:any,sender:Actor,receiver:Actor}){
    this.forwardByName(actor.name,msg)
  }

  broadcast(message:any){
    if(this.actorSystem != null) this.actorSystem.actors.forEach(a=>a.tell(message,this))
    else console.warn("you try to broadcast message when actor stopped or on pause state")
  }

  tell(message:any,sender:Actor){
    if(this.state == Actor.STATE_FOREGROUND) this.receive({message:message,sender:sender,receiver:this})
    else if(this.state == Actor.STATE_BACKGROUND) this.backgroundMessageBox.push({message:message,sender:sender,receiver:this})
  }

  become(receiver:(m:{message:any,sender:Actor,receiver:Actor})=>any){
    this.receive = receiver
  }

}

export const PRELOAD_ACTORS = new InjectionToken<string[]>("preload_actors")

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  actors:Actor[] = []

  constructor(@Inject(PRELOAD_ACTORS) preloadActors:string[]){
    if(preloadActors) preloadActors.forEach(name=>this.create(name))
  }

  create(name:string):Actor{
    let actor = new Actor(name,this)
    this.actors.push(actor)
    return actor
  }

  start(name:string,receiver:(m:{message:any,sender:Actor,receiver:Actor})=>any):Actor{
    let ret:Actor = null
    let targetActors = this.actors.filter(a=>a.name == name)
    if(targetActors.length == 0){
      let actor = new Actor(name,this)
      actor.become(receiver)
      actor.state = Actor.STATE_FOREGROUND
      this.actors.push(actor)
      ret = actor
    }else{
      targetActors.forEach(actor=>{
        actor.actorSystem = this
        actor.become(receiver)
        actor.state = Actor.STATE_FOREGROUND
        actor.backgroundMessageBox.forEach(m => actor.receive(m))
        ret = actor
      })
    }
    return ret
  }

  startActor(actor:Actor):Actor{
    if(actor.name == null) throw new Error("Actor must have a unique name")
    let targetActors = this.actors.filter(a=>a.name == actor.name)
    if(targetActors.length == 0){
      actor.actorSystem = this
      actor.state = Actor.STATE_FOREGROUND
      this.actors.push(actor)
    }else{
      actor.actorSystem = this
      actor.state = Actor.STATE_FOREGROUND
      actor.backgroundMessageBox.forEach(m => actor.receive(m))
    }
    return actor
  }

  pause(name:string){
    this.actors.filter(a=>a.name == name).forEach(a=>{
      a.actorSystem = null
      a.state=Actor.STATE_BACKGROUND
    })
  }

  stop(name:string){
    let idx = -1;
    for(let i=0;i<this.actors.length;i++){
      if(this.actors[i].name == name){
        this.actors[i].actorSystem = null
        idx = i
        break
      }
    }
    if(idx > -1) this.actors.splice(idx,1)
  }

}
