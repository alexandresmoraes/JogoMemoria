export function embaralhar(array: any[]) {
    const novoArray = array.slice();
    for (let i = novoArray.length; i; i -= 1) {
        let j = Math.floor(Math.random() * i);
        let x = novoArray[i - 1];
        novoArray[i - 1] = novoArray[j];
        novoArray[j] = x;
    }
    return novoArray;
}