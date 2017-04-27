import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card, CARDS, duplicarCards } from "app/card/card.model";
import { embaralhar } from "app/core/array";
import { DadosJogo, STATUS } from './../core/dados-jogo';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  cards$: Observable<Card[]>;

  private timerId: any;

  constructor(
    private dadosJogo: DadosJogo
  ) {
    this.dadosJogo.status = STATUS.INICIO;
    this.dadosJogo.acertos = 0;
    this.dadosJogo.erros = 0;
    this.dadosJogo.tempo = 0;
    this.dadosJogo.top1 = 25;
    this.dadosJogo.cardSelecionado = null;

    this.cards$ = new Observable(observer => {
      this.dadosJogo.cards = embaralhar(duplicarCards());
      observer.next(this.dadosJogo.cards);
    });
  }

  isJogando(): Boolean {
    return this.dadosJogo.status == STATUS.JOGANDO;
  }

  atualizarStatus(novo: STATUS): void {
    if (novo == STATUS.JOGANDO) {
      this.timerId = setInterval(() => {
        this.dadosJogo.tempo = this.dadosJogo.tempo + 10;
      }, 100);
    }
    if (novo == STATUS.INICIO) {
      this.dadosJogo.tempo = 0;
      clearInterval(this.timerId);
    }
    this.dadosJogo.status = novo;
  }

  atualizarCard(c: Card): void {
    if (this.dadosJogo.cardSelecionado == null)
      c.flipped = !c.flipped;
    else {
      if (this.dadosJogo.cardSelecionado._id != c._id)
        this.dadosJogo.cardSelecionado = c;
      else {

      }
    }
  }

  desvirarCards(): void {
    for (let card of this.dadosJogo.cards) {
      if (card.flipped) {
        card.flipped = !card.flipped;
      }
    }
  }

  reset(): void {
    this.desvirarCards();

    setTimeout(() => {
      this.cards$ = new Observable(observer => {
        this.dadosJogo.cards = embaralhar(duplicarCards());
        observer.next(this.dadosJogo.cards);
      });
    }, 1000);

    this.atualizarStatus(STATUS.INICIO);
  }

  flipCard(c: Card): void {
    let card: Card = c;

    this.atualizarCard(c);

    if (this.dadosJogo.status == STATUS.INICIO) {
      this.atualizarStatus(STATUS.JOGANDO);
    }

    this.dadosJogo.top1 = 100;
    this.dadosJogo.status = STATUS.JOGANDO;
  }
}