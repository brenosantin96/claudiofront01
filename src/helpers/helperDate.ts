export function formatDate(dateString: string) {

    if (dateString.length >= 10) {

        let arrayDateYYMMDD = dateString.split('-');

        let day: string = arrayDateYYMMDD[2];
        let month: string = arrayDateYYMMDD[1];
        let year: string = arrayDateYYMMDD[0];

        let numberDay: number = parseInt(day);
        let numberMonth: number = parseInt(month) - 1;
        let numberYear: number = parseInt(year);

        let dateStarted = new Date(numberYear, numberMonth, numberDay, 0, 0, 0);
        return dateStarted;

    }
}
