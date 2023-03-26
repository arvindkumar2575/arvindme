let app = {}
let templates = {}
let data = d

app.skillRandomColor = (s,min,max) => {
    let a = {}
    s.forEach(e => {
        a["" + e + ""] = "" + app.randomColor(min, max) + ',' + app.randomColor(min, max) + ',' + app.randomColor(min, max) + ""
    })
    return a
}
app.randomColor = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}
// get skill colors 
const skills = app.skillRandomColor(data.s,150,225)

// get experience skills colors 
app.expSkills = (ms, as) => {
    let a = []
    for (const [key, value] of Object.entries(ms)) {
        let o = {}
        o["" + value + ""] = as["" + value + ""]
        a.push(o)
    }
    return a
}


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



templates.e = (count,d) => {
    return `
    <div class="col-md-12 experience-row-JX row-${count}">
        <div class="row">
            <div class="col-md-12 experience-JX AR3333-JX">
                <div class="row">
                    <div class="col-md-12">
                        <div class="media">
                            <img src="${d.image}" class="mr-3 AR3318-JX" alt="...">
                            <div class="media-body">
                                <h6 class="mt-0 mb-0 position-role-JX">
                                    <span>${d.designation}</span>
                                    <span class="tenure-JX">${d.tenure[0]} : ${d.tenure[1]}</span>
                                </h6>
                                <div class="company-name-location-JX"><span>${d.company_name} - ${d.loc}</span>
                                </div>
                                <div class="work-description-JX">
                                    <span class="font-weight-bold">Description</span> : ${d.description}<span class="read-more showpoints" data-selector="AR3333-JX">read more...</span>
                                </div>
                                <div class="modelpoints">${d.mp}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12 tools-tech-JX">
            <ul>${d.ms}</ul>
        </div>
    </div>
    `
}
templates.ms = (d) => {
    let s = ''
    for (const [key, value] of Object.entries(d)) {
        for (const [vkey, vvalue] of Object.entries(value)) {
            s += `<li data-sindex="${key}" style="background:rgb(${vvalue})">${vkey}</li>`
        }
    }
    return s
}
templates.eps = (d) => {
    return `
    <div class="col-sm-6 col-xs-12">
        <label>${d[0]}</label>
        <div class="progress">
            <div class="progress-bar "  role="progressbar" style="width: ${d[1]}%;background-color:rgb(${d[2]})" aria-valuenow="35"
                aria-valuemin="0" aria-valuemax="100">${d[1]}%</div>
        </div>
    </div>`
}
templates.p = (d) => {
    return `
    <div class="col-md-6">
        <div class="AR3512-JX AR3333-JX">
            <div class="prj-box prj-playstore-app">
                <div class="prj-name" style="background-color:${d.hcolor}">
                    <h4>${d.name}</h4>
                    <p class="prj-type">${d.type}</p>
                </div>
                <div class="prj-detail">
                    <p class="detail-1">
                        ${d.details} ${d.app_link!=''?'<a href="'+d.app_link+'">link</a>':''}
                    </p>
                    <div class="detail-2">
                        <p class="font-weight-bold text-decoration-underline">Technology</p>
                        <p>${d.tools_tech}</p>
                        <p>${d.app_status}</p>
                    </div>
                </div>
                <div class="prj-point-link">
                    <i class="fa fa-external-link showpoints" data-selector="AR3333-JX" aria-hidden="true"></i>
                </div>
                <div class="modelpoints">${d.mp}</div>
            </div>
        </div>
    </div>`
}
templates.model = (a_name,p_name,type,points) => {
    return `
    <div class="content-body">
        <h4>${a_name}</h4>
        <div class="exp-heading">
            <h5>${p_name}</h5>
        </div>
        <div class="exp-body">
            <p>${type=='experience'?'Below my job duties & responsiblities here:-':(type=='project'?'Below points used in project development:-':'')}</p>
            <ul>
                ${points}
            </ul>
        </div>
    </div>`
}
templates.li = (d) => {
    return `<li>${d}</li>`
}


