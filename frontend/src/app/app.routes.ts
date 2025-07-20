import { Routes } from '@angular/router';
import {ListGamesToJoinComponent} from './list-games-to-join/list-games-to-join.component';
import {CreateGamePageComponent} from './create-game-page/create-game-page.component';
import {HomepageComponent} from './homepage/homepage.component';
import {JoinGameComponent} from './join-game/join-game.component';
import {PlaygameComponent} from './playgame/playgame.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'create-game', component: CreateGamePageComponent},
  {path: 'list-games-to-join', component: ListGamesToJoinComponent},
  {path: 'join-game/:id', component: JoinGameComponent},
  {path: 'playgame/:id', component: PlaygameComponent},
];
