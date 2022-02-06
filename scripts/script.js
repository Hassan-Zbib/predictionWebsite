const getDogImg = async () => {
    const url = new URL('https://dog.ceo/api/breeds/image/random')
    const response = await fetch(url).then(res => res.json())
    return response.message
}

const getPredictionData = async name => {
    const [age_pred, gndr_pred, nat_pred] = await Promise.all([
        fetch(`https://api.agify.io/?name=${name}`).then(res => res.json()),
        fetch(`https://api.genderize.io?name=${name}`).then(res => res.json()),
        fetch(`https://api.nationalize.io/?name=${name}`).then(res => res.json())
    ])

    return {
        age: age_pred.age,
        gender: gndr_pred.gender,
        countries: nat_pred.country
    }

}

const main = () => {
    getDogImg()
        .then(res => console.log(res))
        .catch(err => console.log(err))

    getPredictionData('joe')
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

window.onload = main