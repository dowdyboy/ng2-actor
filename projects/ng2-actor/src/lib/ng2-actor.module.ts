import { NgModule } from '@angular/core';
import {PRELOAD_ACTORS} from "./ng2-actor.service";

@NgModule({
  declarations: [],
  imports: [
  ],
  providers:[
    {provide:PRELOAD_ACTORS,useValue:[]}
  ],
  exports: []
})
export class Ng2ActorModule { }
