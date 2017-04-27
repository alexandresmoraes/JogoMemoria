import { Injectable } from '@angular/core';
import { Card } from './../card/card.model';

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
    status?: STATUS;
    cards?: Card[];
    cardSelecionado?: Card;
};