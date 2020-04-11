


function getDate() {

    let fecha = hoyFecha();

    function hoyFecha() {
        const hoy = new Date();
        const dd = hoy.getDate();
        const mm = hoy.getMonth() + 1;
        const yyyy = hoy.getFullYear();

        dd = addZero(dd);
        mm = addZero(mm);

        return dd + '/' + mm + '/' + yyyy;
    }
    function addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    return fecha;
}



module.exports = {
    getDate: getDate,
}