import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Card, CARDS } from './card.model';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {
    @Input() info: Card;

    @Output() flipped = new EventEmitter();

    backCard: Card;

    constructor() {
        this.backCard = CARDS.find(c => c.name === 'Timao');
    }

    flip(info: Card) {
        this.flipped.emit(info);
    }
}
