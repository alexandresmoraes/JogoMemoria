import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

import { Card, CARDS, duplicarCards } from "app/card/card.model";
import { embaralhar } from "app/core/array";
import { DadosJogo, STATUS } from './../core/dados.jogo';
import { JogoService } from './../services/jogo.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  constructor(
    private jogoService: JogoService,
    public dadosJogo: DadosJogo
  ) { }

  trackByCards(index: number, card: Card) {
    return card._id;
  }

  isJogando(): Boolean {
    return this.dadosJogo.status == STATUS.JOGANDO;
  }

  isFim(): Boolean {
    return this.dadosJogo.status == STATUS.FIM;
  }

  reset(): void {
        this.jogoService.reset();
    }

  flipCard(c: Card): void {
    this.jogoService.atualizarCard(c);

    if (this.dadosJogo.status == STATUS.INICIO) {
      this.jogoService.atualizarStatus(STATUS.JOGANDO);
    }
  }
}