const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById('fortuneButton')
const goalContainer = document.querySelector('#goal-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/goal`

const goalCallback = ({ data: goals}) => displayGoals(goals)
const errCallback = err => console.log(err)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get('http://localhost:4000/api/fortune/')
        .then(res => {
            const data = res.data
            alert(data)
        })
}

const getAllGoals = () => {
    axios.get(baseURL)
    .then(goalCallback)
    .catch(errCallback)
}

const createGoal = body => {
    axios.post(baseURL, body)
    .then(goalCallback)
    .catch(errCallback)    
}

const deleteGoal = id => {
    axios.delete(`${baseURL}/${id}`)
    .then(goalCallback)
    .catch(errCallback)
}

const updateGoal = (id, type) => {
    axios.put(`${baseURL}/${id}`, {type})
    .then(goalCallback)
    .catch(errCallback)
}

function submitHandler(e) {
    e.preventDefault()

    let goal = document.querySelector('#goal')
    let year = document.querySelector('#year')

    let bodyObj = {
        goal: goal.value,
        year: year.value
    }

    createGoal(bodyObj)

    goal.value = ''
    year.value = ''
}

function createGoalCard(goals) {
    const goalCard = document.createElement('div')
    goalCard.classList.add('goal-card')

    goalCard.innerHTML = `<p class="goal">${goals.goal}</p><div class="btns-container">
    <button onclick="updateGoal(${goals.id}, 'minus')">-</button>
    <p class="goal-year">${goals.year}</p>
    <button onclick="updateGoal(${goals.id}, 'plus')">+</button>
</div>
<button onclick="deleteGoal(${goals.id})">delete</button>
`

    goalContainer.appendChild(goalCard)
}

function displayGoals(arr) {
    goalContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalCard(arr[i])
    }
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', submitHandler)

getAllGoals()