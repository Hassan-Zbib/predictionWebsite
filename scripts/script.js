const getDogImg = async () => {
    const url = 'https://dog.ceo/api/breeds/image/random'
    const response = await fetch(url).then(res => res.json())
    return response.message
}

const getPredictionData = async name => {
    const age_pred = await fetch(`https://api.agify.io/?name=${name}`).then(res => res.json())
    const gndr_pred = await fetch(`https://api.genderize.io?name=${name}`).then(res => res.json())
    const nat_pred = await fetch(`https://api.nationalize.io/?name=${name}`).then(res => res.json())



}

