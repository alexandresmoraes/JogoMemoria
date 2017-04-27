import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';
import { DadosJogo } from './core/dados-jogo';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DadosJogo],
  bootstrap: [AppComponent]
})
export class AppModule { }
