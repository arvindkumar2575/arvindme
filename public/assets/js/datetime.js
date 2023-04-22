let app = {}
let templates = {}
let data = d.tn

window.addEventListener('load',()=>{
    let c = app.c(data,'tz')
    console.log(typeof(c))
    c.forEach(e=>{
        console.log(e,app.td(e))
    })
})

app.c = (d,type)=>{
    let c = {}
    let t = []
    Object.entries(d).map(e1 => {
        let key = ''
        let val = ''
        Object.entries(e1[1]).map(e2=>{
            let k = e2[0]
            let v = e2[1]
            if(k=='continent'){
                key=v
            }
            if(k=='newRow'){
                val=v
                v.forEach(element => {
                    t.push(element.tz)
                });
            }
        })
        c["" + key + ""]=val
    });
    return type=='tz'?t:c
}

app.td = (tz,lc=null)=>{
    let locales = (lc==undefined || lc==null || lc=='')?'en-US':lc
    return new Date(new Date().toLocaleString(locales, {timeZone: tz}))
}


