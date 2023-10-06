
window.addEventListener('load', () => {
    let c = app.c(data.tn, 'tz')
    let list = ''
    c.forEach(e => {
        list += templates.eachList(e)
    })

    let current_local = app.selectByID('current-local')
    let show_time = app.selectByID('show-time')

    let date = new Date()
    let tz = date.toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' }).substring(4).match(/\b(\w)/g).join('') + ' (' + date.toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' }).substring(4) + ')'
    let ltz = app.dateGMTHr()
    let ofst = date.getTimezoneOffset()
    current_local.innerHTML = templates.localDetails('tz', tz, 'ltz', ltz, 'ofst', ofst)
    current_local.innerHTML += templates.localTime(date.getHours(), date.getMinutes(), date.getSeconds())

    
    setInterval(() => {
        let date = new Date()
        app.setdt('',date)
    }, 1000)

    let allTimezone = app.collectAllTimezone(data.tn)
    const arr = [...allTimezone]
    arr.forEach((e,i) => {
        let dt = app.td(e)
        let td = new Date(dt)
        show_time.innerHTML += templates.show_time(i,e,td)
    })
})



app.setdt = (i,date) => {
    let c_sec = date.getSeconds()
    let c_min = date.getMinutes()
    let c_hr = date.getHours()
    let hour = app.selectByID(i==''?'c_hr':'t_hr_'+i)
    let minute = app.selectByID(i==''?'c_min':'t_min_'+i)
    let second = app.selectByID(i==''?'c_sec':'t_sec_'+i)
    second.innerHTML = app.twoDigitFormat(c_sec)
    minute.innerHTML = app.twoDigitFormat(c_min)
    hour.innerHTML = app.twoDigitFormat(c_hr)
}
app.dateGMTHr = () => {
    let gmt = Intl.DateTimeFormat().resolvedOptions().timeZone
    return gmt
}
app.twoDigitFormat = (t) => {
    return t < 10 ? `0${t}` : t
}
app.getTimeByZone = (tz) => {
    return (new Date()).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric', hour12: true,
        minute: 'numeric',
        second: 'numeric',
        timeZone: tz })
}
app.collectAllTimezone = (d) => {
    let tz = new Set()
    d.forEach(e => {
        if(e.hasOwnProperty('newRow')){
            e.newRow.forEach(e1 => {
                if(e1.hasOwnProperty('tz')){
                    tz.add(e1.tz)
                }
            })
        }
    });
    return tz
}
templates.eachList = (loc) => {
    return templates.li(app.td(loc) + ' ' + loc)
}
templates.localDetails = (ctz, tz, cltz, ltz, cofst, ofst) => {
    return `<div class="local-details">
                <p class="p-0 m-0">TimeZone: <span id="${ctz}" class="${ctz}">${tz}</span></p>
                <p class="p-0 m-0">Local TimeZone : <span id="${cltz}" class="${cltz}">${ltz}</span></p>
                <!--<p class="p-0 m-0">Offset : <span id="${cofst}" class="${cofst}">${ofst}</span></p>-->
            </div>`
}
templates.localTime = (hr, min, sec) => {
    return `
    <div class="local-time">
        <p class="p-0 m-0">Your Local Time</p>
        <div class="c-time">
            <span id="c_hr" class="hr">${hr}</span>
            <span class="h-m-colon">:</span>
            <span id="c_min" class="min">${min}</span>
            <span class="m-s-colon">:</span>
            <span id="c_sec" class="sec">${sec}</span>
            <span id="ampm" class="ampm"></span>
        </div>
    </div>`
}
templates.show_time = (key,tz,tm) => {
    return `<div class="time-details">
                <p class="p-0 m-0">TimeZone: <span id="td-tz-${key}" class="td-tz">${tz}</span></p>
                <p class="p-0 m-0">Time : 
                    <div id="td-tm-${key}" class="t-time">
                        <span id="t_hr_${key}" class="hr">${app.twoDigitFormat(tm.getHours())}</span>
                        <span class="h-m-colon">:</span>
                        <span id="t_min_${key}" class="min">${app.twoDigitFormat(tm.getMinutes())}</span>
                        <span class="m-s-colon">:</span>
                        <span id="t_sec_${key}" class="sec">${app.twoDigitFormat(tm.getSeconds())}</span>
                        <span id="ampm" class="ampm"></span>
                    </div>
                </p>
            </div>`
}



