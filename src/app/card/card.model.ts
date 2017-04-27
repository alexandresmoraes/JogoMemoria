export class Card {
    _id?: number;
    flipped: Boolean;
    name: String;
    url?: any;
}

import * as URL_ANGULAR from '../../assets/img/angular.png';
import * as URL_CHROME from '../../assets/img/chrome.png';
import * as URL_CSHARP from '../../assets//img/csharp.png';
import * as URL_FIREFOX from '../../assets/img/firefox.jpg';
import * as URL_IONIC from '../../assets/img/ionic.jpg';
import * as URL_JQUERY from '../../assets/img/jquery.png';
import * as URL_VSCODE from '../../assets/img/vscode.jpg';
import * as URL_VSSTUDIO from '../../assets/img/vsstudio.jpg';

import * as URL_TIMAO from '../../assets/img/timao.jpg';

export const CARDS: Card[] = [{
    name: 'Angular',
    flipped: false,
    url: URL_ANGULAR
}, 
{
    name: 'Chrome',
    flipped: false,
    url: URL_CHROME
},
{
    name: 'CSharp',
    flipped: false,
    url: URL_CSHARP
},
{
    name: 'Firefox',
    flipped: false,
    url: URL_FIREFOX
},
{
    name: 'Ionic',
    flipped: false,
    url: URL_IONIC
},
{
    name: 'JQuery',
    flipped: false,
    url: URL_JQUERY
},
{
    name: 'Visual Studio Code',
    flipped: false,
    url: URL_VSCODE
},
{
    name: 'Visual Studio',
    flipped: false,
    url: URL_VSSTUDIO
},
{
    name: 'Timao',
    flipped: false,
    url: URL_TIMAO
}];

const CARDS_SEM_TIMAO = CARDS.filter(c => c.name !== 'Timao');

export function duplicarCards() {
    return CARDS_SEM_TIMAO.concat(CARDS_SEM_TIMAO).map((c, i) => ({
        _id: i,
        name: c.name,
        flipped: c.flipped,
        url: c.url
    }));
}
