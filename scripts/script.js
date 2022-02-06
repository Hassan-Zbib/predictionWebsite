// custom error handler
const handleFetchRes = response => {
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`
        throw new Error(message)
    }
    return response.json()
}

const getDogImg = async () => {
    const response = await fetch(new URL('https://dog.ceo/api/breeds/image/random')).then(res => handleFetchRes(res))
    return response.message
}

const getPredictionData = async name => {
    // awaiting all call requests at the same time 
    const [age_pred, gndr_pred, nat_pred] = await Promise.all([
        fetch(new URL(`https://api.agify.io/?name=${name}`)).then(res => handleFetchRes(res)),
        fetch(new URL(`https://api.genderize.io?name=${name}`)).then(res => handleFetchRes(res)),
        fetch(new URL(`https://api.nationalize.io/?name=${name}`)).then(res => handleFetchRes(res))
    ])
    return {
        age: age_pred.age,
        gender: gndr_pred.gender,
        countries: nat_pred.country
    }
}

const addPrediction = () => {
    let name = document.getElementById("input").value
    if (!name) {
        document.querySelector(".input .label").textContent = "Please Enter a name First"
    } else {
        getPredictionData(name)
        .then(res => {
            document.querySelector(".info").style.display = "block"

            document.getElementById("name").textContent = name
            document.getElementById("age").textContent =   res.age ? res.age : "No Age Predicted"
            document.getElementById("gender").textContent = res.gender ? res.gender : "No Gender Predicted"
            let countries = res.countries
            if (countries.length === 0 ) {
                document.getElementById("nationalities").textContent = "No Countries predicted"
            } else {
                let ul = "<ul>"
                countries.forEach(country => {
                    let li = `<li>${country.country_id}</li>`
                    ul = ul + li
                })
                ul = ul + "</ul>"
                document.getElementById("nationalities").innerHTML = ul
            }
        })
        .catch(err => showErr(err))
    }
}

const showErr = error => {
    document.querySelector(".input .label").textContent = error
}

const main = () => {
    getDogImg()
        .then(res => {
            document.getElementById("image").setAttribute("src", res)
        })
        .catch(err => showErr(err))

    document.getElementById("predict").addEventListener("click", addPrediction)
}

window.onload = main