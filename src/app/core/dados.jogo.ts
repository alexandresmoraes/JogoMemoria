import { Injectable } from '@angular/core';

import { Card } from './../card/card.model';
import { duplicarCards } from 'app/card/card.model';
import { embaralhar } from 'app/core/array';
import { Observable } from 'rxjs/Observable';

export enum STATUS {
    INICIO,
    JOGANDO,
    FIM
}

@Injectable()
export class DadosJogo {
    acertos?: number;
    erros?: number;
    tempo?: number;
    top1?: number;
    points?: number;
    status?: STATUS;
    cards?: Card[];
    cards$?: Observable<Card[]>;
    cardSelecionado?: Card;

    constructor() {
        this.status = STATUS.INICIO;
        this.acertos = 0;
        this.erros = 0;
        this.tempo = 0;
        this.top1 = 0;
        this.points = 0;
        this.cardSelecionado = null;

        this.cards = embaralhar(duplicarCards());
        this.cards$ = new Observable(o => {
            o.next(this.cards);            
        });
    }
};