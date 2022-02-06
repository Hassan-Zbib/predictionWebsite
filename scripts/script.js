// custom error handler
const handleFetchRes = response => {
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response.json()
}

const getDogImg = async () => {
    const response = await fetch(URL('https://dog.ceo/api/breeds/image/random')).then(res => handleFetchRes(res))
    return response.message
}

const getPredictionData = async name => {
    // awaiting all call requests at the same time 
    const [age_pred, gndr_pred, nat_pred] = await Promise.all([
        fetch(URL(`https://api.agify.io/?name=${name}`)).then(res => handleFetchRes(res)),
        fetch(URL(`https://api.genderize.io?name=${name}`)).then(res => handleFetchRes(res)),
        fetch(URL(`https://api.nationalize.io/?name=${name}`)).then(res => handleFetchRes(res))
    ])
    return {
        age: age_pred.age,
        gender: gndr_pred.gender,
        countries: nat_pred.country
    }
}

const addPrediction = () => {
    let name = document.getElementById("input").value
    getPredictionData(name)
        .then(res => console.log(res))
        .catch(err => showErr(err))
}

const showErr = error => {
    console.log(error)
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