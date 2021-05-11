export function getDaysDates(inicio, fim){

    var a = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate())
    var b = new Date(fim.getFullYear(), fim.getMonth(), fim.getDate())

    var days = (a - b) / (60 * 60 * 24 * 1000);

    return parseFloat(days)

}
export function getDateFormat(data){

    var dia = data.getDate().toString().length === 1 ? '0'+data.getDate() : data.getDate()
    var mes = (data.getMonth() + 1).toString().length === 1 ? '0'+(data.getMonth() +1) : (data.getMonth()+1)

    return data.getFullYear()+'-'+mes+'-'+dia

}

export function getDates( dias, dataInicial, dataAtual ){

    var data = new Date(dataInicial)
    var meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

    var dates = []

    for (var i = 0; i < dias + 1; i++) {
        
        //seta data a Menos
        data.setDate(data.getDate() + 1)

        var dia = data.getDate()
        var mes = data.getMonth()
        var ano = data.getFullYear()
        var anoMesDia = ano+'-'+mes+'-'+dia
        var active = dataAtual.getFullYear()+''+dataAtual.getMonth()+''+dataAtual.getDate() === data.getFullYear()+''+data.getMonth()+''+data.getDate() ? true : false

        dates.push(
            {
                date: anoMesDia,
                dia: dia,
                mes: mes,
                ano: ano,
                mesNome: meses[mes],
                active: active,
            }
        )

    }

    return dates

}

export function getDatesPeriodo( dias ){

    var data = new Date()
        data.setDate(data.getDate() - dias)

    var dia = data.getDate().toString().length === 1 ? '0'+data.getDate() : data.getDate()
    var mes = (data.getMonth() + 1).toString().length === 1 ? '0'+(data.getMonth() +1) : (data.getMonth()+1)

    return data.getFullYear()+'-'+mes+'-'+dia

}

export function formatarNumero(n) {
    
    n = n.toString()
    var r = ''
    var x = 0

    for (var i = n.length; i > 0; i--) {
        r += n.substr(i - 1, 1) + (x === 2 && i !== 1 ? '.' : '')
        x = x === 2 ? 0 : x + 1
    }

    return r.split('').reverse().join('')

}