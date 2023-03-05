let app = {}
let templates = {}
let data = d

app.skillRandomColor = (s) => {
    let a = {}
    s.forEach(e => {
        a["" + e + ""] = "" + app.randomColor(1, 225) + ',' + app.randomColor(1, 225) + ',' + app.randomColor(1, 225) + ""
    })
    return a
}
app.randomColor = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}
// get skill colors 
const skills = app.skillRandomColor(data.s)

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

// let s1 = data.e[0].skill
// let s2 = d.e[1].skill
// let dddd = app.expSkills(s1, skills)
// console.log(templates.ms(dddd))
// console.log(app.expSkills(s2,skills))


window.addEventListener('load', () => {
    let expDiv = document.getElementById("id-AR3312")
    let exp = data.e
    let etv = ''
    exp.forEach(i => {
        i.skill = app.expSkills(i.skill, skills)
        i.ms = templates.ms(i.skill)
        etv += templates.e(i)
    })
    expDiv.innerHTML = etv

    let psDiv = document.getElementById("id-AR3411")
    let ps = data.sp
    let psv = ''
    ps.forEach(i=>{
        psv+=templates.eps(i)
    })
    psDiv.innerHTML=psv
});


templates.e = (d) => {
    return `
    <div class="col-md-12 experience-row-JX">
        <div class="row">
            <div class="col-md-12 experience-JX">
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
                                <div class="work-description-JX"><span class="font-weight-bold">Description</span> : ${d.description}<a href="#">read more...</a></div>
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
            <div class="progress-bar bg-${d[1]<50?'danger':d[1]<76?'info':d[1]<90?'primary':'success'}" role="progressbar" style="width: ${d[1]}%" aria-valuenow="35"
                aria-valuemin="0" aria-valuemax="100">${d[1]}%</div>
        </div>
    </div>`
}


