import {Component, OnInit} from '@angular/core';
import {ActorService} from "../../projects/ng2-actor/src/lib/ng2-actor.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng2-actor-spec';

  constructor(private $actor:ActorService){}

  ngOnInit(): void {
    this.$actor.actors.forEach(a=>console.log(a))
  }
}
