export function convertToMoney(valorString: any) {

    if (typeof(valorString) === "string") {
        valorString = valorString.replace('.', '').replace(',', '.').replace('R$', '').replace('R$ ', '').replace('€', '');
        let valorFloat = parseFloat(valorString);
        return valorFloat;
    }

    if (typeof(valorString) === "number") {
        let newStringValue = valorString.toString();
        newStringValue = newStringValue.replace('.', '').replace(',', '.').replace('R$', '').replace('R$ ', '').replace('€', '');
        let valorFloat = parseFloat(newStringValue);
        return valorFloat;
    }

    else {
        return 0;
    }

}