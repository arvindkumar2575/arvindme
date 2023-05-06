
window.addEventListener('load',()=>{
    let c = app.c(data.tn,'tz')
    let list = ''
    c.forEach(e=>{
        list+=templates.eachList(e)
    })

    let t = app.selectByID('show-time')
    // t.innerHTML=list


    
    
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
app.timeFormat = (t) => {
    return t<10?`0${t}`:t
}
templates.eachList = (loc) => {
    return templates.li(app.td(loc)+' '+loc)
}



