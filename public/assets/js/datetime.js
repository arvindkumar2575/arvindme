
window.addEventListener('load',()=>{
    let c = app.c(data.tn,'tz')
    let list = ''
    c.forEach(e=>{
        list+=templates.eachList(e)
    })

    let t = app.selectByID('show-time')
    // t.innerHTML=list


    let date = new Date()
    let tz = ''
    let etz = app.selectByID('tz')
    let ltz = app.selectByID('ltz')
    let ofst = app.selectByID('ofst')
    tz+=date.toLocaleDateString(undefined, {day:'2-digit',timeZoneName: 'long' }).substring(4).match(/\b(\w)/g).join('')
    tz+=' ('+date.toLocaleDateString(undefined, {day:'2-digit',timeZoneName: 'long' }).substring(4)+')'
    etz.innerHTML=tz
    ltz.innerHTML=app.dateGMTHr()
    ofst.innerHTML=date.getTimezoneOffset()
    
    
    setInterval(()=>{
        app.setdt()
    },1000)
})



app.setdt = () =>{
    let date = new Date()
    let c_sec = date.getSeconds()
    let c_min = date.getMinutes()
    let c_hr = date.getHours()
    let hour = app.selectByID('hr')
    let minute = app.selectByID('min')
    let second = app.selectByID('sec')
    second.innerHTML=app.timeFormat(c_sec)
    minute.innerHTML=app.timeFormat(c_min)
    hour.innerHTML=app.timeFormat(c_hr)
}
app.dateGMTHr = () => {
    let gmt = Intl.DateTimeFormat().resolvedOptions().timeZone
    return gmt
}
app.timeFormat = (t) => {
    return t<10?`0${t}`:t
}
templates.eachList = (loc) => {
    return templates.li(app.td(loc)+' '+loc)
}



