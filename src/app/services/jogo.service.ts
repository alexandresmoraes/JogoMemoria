import { Injectable } from '@angular/core';

import { DadosJogo, STATUS } from './../core/dados.jogo';
import { duplicarCards } from 'app/card/card.model';
import { embaralhar } from 'app/core/array';
import { Card } from './../card/card.model';
import { isEmpty } from "app/core/validators";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JogoService {
    private timerId: any;

    constructor(private dadosJogo: DadosJogo) {
        this.atualizarTop1();
    }

    atualizarTop1(): void {
        this.dadosJogo.top1 = Number(localStorage.getItem('top1') || 0);

        if (this.dadosJogo.top1 == 0 || this.dadosJogo.points > this.dadosJogo.top1) {            
            localStorage.setItem('top1', String(this.dadosJogo.points));
            this.dadosJogo.top1 = this.dadosJogo.points == 0 ? 2 : this.dadosJogo.points;
        }
    }

    atualizarStatus(novo: STATUS): void {
        if (novo == STATUS.JOGANDO) {
            this.timerId = setInterval(() => {
                this.dadosJogo.tempo = this.dadosJogo.tempo + 10;
            }, 100);
        }
        else if (novo == STATUS.INICIO) {
            this.dadosJogo.tempo = 0;
            this.dadosJogo.acertos = 0;
            this.dadosJogo.erros = 0;
            clearInterval(this.timerId);
        }
        else if (novo == STATUS.FIM) {
            debugger;
            this.dadosJogo.points =
                4200 - (this.dadosJogo.erros * (this.dadosJogo.tempo / 100));
            this.atualizarTop1();
            clearInterval(this.timerId);
        }
        this.dadosJogo.status = novo;
    }

    desvirarCards(): void {
        for (let card of this.dadosJogo.cards) {
            if (card.flipped) {
                card.flipped = !card.flipped;
            }
        }
    }

    atualizarCard(card: Card): void {
        card.flipped = !card.flipped;

        if (isEmpty(this.dadosJogo.cardSelecionado)) {
            this.dadosJogo.cardSelecionado = card;
        }
        else if (this.dadosJogo.cardSelecionado.name != card.name) {
            let ultimoid = this.dadosJogo.cardSelecionado._id;
            this.dadosJogo.cardSelecionado = null;
            this.dadosJogo.erros++;
            setTimeout(() => {
                this.dadosJogo.cards = this.dadosJogo.cards.map(c => c._id === card._id ? { _id: c._id, name: c.name, flipped: !c.flipped, url: c.url } : c);
                this.dadosJogo.cards = this.dadosJogo.cards.map(c => c._id === ultimoid ? { _id: c._id, name: c.name, flipped: !c.flipped, url: c.url } : c);
                this.dadosJogo.cards$ = new Observable(o => {
                    o.next(this.dadosJogo.cards);
                });
            }, 1000);
        }
        else if (this.dadosJogo.cardSelecionado.name == card.name) {
            this.dadosJogo.cardSelecionado = null;
            this.dadosJogo.acertos++;
            if (this.dadosJogo.acertos == 8) {
                this.atualizarStatus(STATUS.FIM);
            }
        }
    }
}