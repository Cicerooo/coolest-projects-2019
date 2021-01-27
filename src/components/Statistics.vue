<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <h2 class="title">statistici</h2>
        <h3 class="subtitle">Expense and Income Tracker</h3>
        <apexchart type="bar" height="430" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <form class="form" @submit.prevent="addExpenses">
          <h4>Add New Entry</h4>
          <div class="form-group">
            <label>Expenses</label>
            <input class="form-control" placeholder="How much did you spend?" type="number" v-model="expenseamount" required>
          </div>
          <div class="form-group">
            <label>Income</label>
            <input class="form-control" placeholder="How much did you earn?" type="number" v-model="incomeamount" required>
          </div>
          <div class="form-group">
            <label>Date</label>
            <input class="form-control" placeholder="Date" type="date" v-model="entrydate" required>
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Add New Entry</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
import axios from "axios";
  const socket = new Pusher('APP_KEY', {
    cluster: 'eu',
    encrypted: true
  })
  const channel = socket.subscribe('finance')
  export default {
    name: 'Statistics',
        components: {
          apexchart: VueApexCharts,
        },
        data: {
          
          series: [{
            data: [44, 55, 41, 64, 22, 43, 21]
          }, {
            data: [53, 32, 33, 52, 13, 44, 32]
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            xaxis: {
              categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
            },
          },
          },
    methods: {
   fillData () {
        axios.get('/Habit')
          .then(response => {
            let results = response.data.data
            let timeresults= results.map(a => a.date)
            let habitsresults = results.map(a => a.habits)
            let favhabitsresults = results.map(a => a.favhabits)
            this.favhabits = favhabitsresults
            this.habits = habitsresults
            this.date = timeresults
            this.datacollection = {
              labels: this.date,
              datasets: [
                {
                  label: 'habits',
                  backgroundColor: "#f87979",
                  data: this.habits
                },
                {
                  label: 'favhabits',
                  backgroundColor: '#5bf8bf',
                  data: this.favhabits
                }
              ]
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      addhabits () {
        let habit = this.habitamount
        let favhabit = this.favhabitamont
        let today = moment().format('MMMM Do YYYY')
        axios.post('/Habit/add', {
          habits: habit,
          favhabit: favhabit,
          date: today
        })
          .then(response => {
            this.habitamount = ''
            this.favhabitamount = ''
            channel.bind('new-expense', function (data) {
              let results = data.newHabit.data
              let dateresult = results.map(a => a.date)
              let habitresult = results.map(a => a.Habit)
              let favHabitresult = results.map(a => a.favHabit)
              this.habit = habitresult
              this.favhabit = favhabitresult
              this.date = dateresult
              this.datacollection = {
                labels: this.date,
                datasets: [
                  {
                    label: 'habit',
                    backgroundColor: 'transparent',
                    pointBorderColor: '#f87979',
                    data: this.habit
                  },
                  {
                    label: 'favhabit',
                    backgroundColor: 'transparent',
                    pointBorderColor: '#5bf8bf',
                    data: this.favhabit
                  }
                ]
              }
            })
          })
          .catch(error => {
            console.log(error)
          })
      },
      fetchData (){
        channel.bind('new-expense', data => {
          let results = data.newExpense.data
          let dateresult = results.map(a => a.date)
          let habitresult = results.map(a => a.habit)
          let favhabitresult = results.map(a => a.favhabit)
          this.habit = habitresult
          this.favhabit = favhabitresult
          this.date = dateresult
          this.datacollection = {
            labels: this.date,
            datasets: [
              {
                label: 'Habit Charts',
                backgroundColor: '#f87979',
                data: this.habit
              },
              {
                label: 'favHabit Charts',
                backgroundColor: '#5bf8bf',
                data: this.favhabit
              }
            ]
          }
        })
      }
    }
  }

</script>

<style scoped>
  .title {
    text-align: center;
    margin-top: 40px;
  }
  .subtitle {
    text-align: center;
  }
  .form {
    max-width: 600px;
    width: 100%;
    margin: 20px auto 0 auto;
  }
  .form h4 {
    text-align: center;
    margin-bottom: 30px;
  }
  h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #6851ec;
}
</style>