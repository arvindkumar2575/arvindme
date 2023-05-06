
window.addEventListener('load', () => {
    let expDiv = document.getElementById("id-AR3312")
    let exp = data.e
    let etv = ''
    let scount = 0
    exp.forEach(i => {
        i.skill = app.expSkills(i.skill, skills)
        i.ms = templates.ms(i.skill)
        let mpoints = ''
        i.points.forEach(i =>  {
            mpoints+=templates.li(i)
        })
        i.mp = templates.model(i.company_name,i.projects,'experience',mpoints)
        etv += templates.e(scount,i)
        scount++
    })
    expDiv.innerHTML = etv

    let psDiv = document.getElementById("id-AR3411")
    let ps = data.sp
    let psv = ''
    ps.forEach(i=>{
        let min=1,max=100
        i[i.length]="" + app.randomColor(min, max) + ',' + app.randomColor(min, max) + ',' + app.randomColor(min, max) + ""
        // console.log(i)
        psv+=templates.eps(i)
    })
    psDiv.innerHTML=psv

    let pDiv = document.getElementById("id-AR3511")
    let p = data.p
    let pv = ''
    p.forEach(i => {
        i.forEach(e => {
            let mpoints = ''
            e.points.forEach(o =>  {
                mpoints+=templates.li(o)
            })
            e.mp = templates.model(e.name,e.type,'project',mpoints)
            pv+=templates.p(e)
        })
    })
    pDiv.innerHTML=pv
});

let modellayout = document.querySelector('#id-AR3611')
let modelbody = document.querySelector('#id-AR3611 .exp-content')
document.addEventListener('click', function (e) {
    let clss = e.target.className.split(' ')
    if (clss.includes('showpoints')) {
        let d = e.target.dataset.selector
        let modelpoints = e.target.closest("div." + d).querySelector(".modelpoints")
        modelbody.innerHTML = modelpoints.innerHTML
        modellayout.style.display = 'block'
    }

    if(clss.includes('mclose')){
        modelbody.innerHTML = ''
        modellayout.style.display = 'none'
    }

    if(clss.includes('resume-download')){
        
    }
});






