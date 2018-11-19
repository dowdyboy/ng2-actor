import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Ng2ActorModule} from "../../projects/ng2-actor/src/lib/ng2-actor.module";
import {PRELOAD_ACTORS} from "../../projects/ng2-actor/src/lib/ng2-actor.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2ActorModule
  ],
  providers: [
    {provide:PRELOAD_ACTORS,useValue:['a','b']}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
