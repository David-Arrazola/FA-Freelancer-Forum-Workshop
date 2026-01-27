/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

function freelanceCreator() {
  // Creating a random index to use to get random person from "NAMES"
  const randomNameIndex = Math.floor(Math.random() * NAMES.length),
    randomOccupationIndex = Math.floor(Math.random() * OCCUPATIONS.length),
    // establishing random rate by subtracting the limits provided and multiplying that by "Math.random()"
    randomRate =
      Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min)) +
      PRICE_RANGE.min; //have to subtract "max-max" because if u dont, "randomRate" can exceed max upper limit when adding "min" later
  return {
    name: NAMES[randomNameIndex],
    occupation: OCCUPATIONS[randomOccupationIndex],
    rate: randomRate,
  };
}

//! THIS IS A STATE VARIABLE OF FREELANCE WORKERS
const workers = [];
for (let i = 0; i < NUM_FREELANCERS; i++) {
  // pushing a freelance object made by "freelanceCreator" into "freelaneWorkers"
  workers.push(freelanceCreator());
}

function getAverageRate(array) {
  /*This anonymous function will be passed into reduce. Per reduce iteration, adds sum total of rates + current rate. 
    Will return total sum of all rates when reduce is finished*/
  const sum = (accumulator, currItem) => accumulator + currItem.rate;
  return array.reduce(sum, 0) / array.length;
}

//! THIS IS A STATE VARIABLE OF THE AVERAGE RATE FOR ALL FREELANCERS
const averageFreelanceRate = getAverageRate(workers);

//COMPONENT FUNCTION
function FreelancerRow(currFreelancer) {
  const $tr = document.createElement("tr");
  $tr.innerHTML = `
        <th>${currFreelancer.name}</th>
        <th>${currFreelancer.occupation}</th>
        <th>${currFreelancer.rate}</th>
    `;
  return $tr;
}

//COMPONENT FUNCTION
function FreelancerTable(freelanceObjArray) {
  const $table = document.createElement("table");
  const mappedFreelanceObjs = freelanceObjArray.map(FreelancerRow);
  $table.replaceChildren(...mappedFreelanceObjs);
  return $table;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <FreelancerTable></FreelancerTable>
  `;
  $app.querySelector("FreelancerTable").replaceWith(FreelancerTable(workers));
}
render();
