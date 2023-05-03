
const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');


const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    console.log(jokeText);
    const newLI = document.createElement('LI');

    newLI.append(jokeText);
    jokes.append(newLI);
    // newLI.append(res.data.joke);
    // jokes.append(newLI);
}
const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json', } };
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    } catch (e) {
        return "오류났어요"
    }
}

button.addEventListener('click', addNewJoke);


