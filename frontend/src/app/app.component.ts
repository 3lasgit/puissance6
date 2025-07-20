import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateGamePageComponent} from './create-game-page/create-game-page.component';
import {ListGamesToJoinComponent} from './list-games-to-join/list-games-to-join.component';
import {HomepageComponent} from './homepage/homepage.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateGamePageComponent, ListGamesToJoinComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'row46modifiedangular';
}
