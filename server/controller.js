const goals = require('./db.json')
let globalId = 3

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ['A friend asks only for your time not your money.', 'A beautiful, smart, and loving person will be coming into your life.', 'A golden egg of opportunity falls into your lap this month.', 'A lifetime friend shall soon be made.', 'A lifetime of happiness lies ahead of you.']

        let randomIndexTwo = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomIndexTwo]

        res.status(200).send(randomFortune)
    },

    getGoals: (req, res) => {
        res.status(200).send(goals)
    },

    deleteGoal: (req, res) => {
        let index = goals.findIndex(goal => goal.id === +req.params.id)

        goals.splice(index, 1)
        res.status(200).send(goals)
    },

    createGoal: (req, res) => {
        let {goal, year} = req.body

        let newGoal = {
            id: globalId,
            goal,
            year
        }

        goals.push(newGoal)

        res.status(200).send(goals)
        globalId++
    },

    updateGoal: (req, res) => {
        let {type} = req.body
        let {id} = req.params

        let index = goals.findIndex(goal => +goal.id === +id)

        if(goals[index].year <= 2022 && type === 'minus'){
            goals[index].year = 2022
            res.status(400).send('cannot go back in time!')
        } else if (type === 'plus'){
            goals[index].year += 1
            res.status(200).send(goals)
        } else if (type === 'minus'){
            goals[index].year -= 1
            res.status(200).send(goals)
        } else {
            res.sendStatus(400)
        }
    }

}