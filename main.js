const { createStore } = Redux;

const initialState = {
  crew: [
    "Unicorn Nick",
    "Sergeant Fang",
    "Sharp-Eye Kerrin"
  ],
  plankers: [
    "Commodore Brianna"
  ]
}

const ADD_PIRATE = 'ADD_PIRATE'
const PLANK_PIRATE = 'PLANK_PIRATE'

const newPirateForm = document.getElementById('new-pirate-form')
const plankButton = document.getElementById('walk-the-plank')

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PIRATE:
      const newCrewArray = state.crew.concat(action.newPirate)
      return Object.assign({}, state, {
        crew: newCrewArray
      })
    case PLANK_PIRATE:
      const plankedPirate = state.crew[0]
      const newPlankedPirates = state.plankers.concat(plankedPirate)
      const filteredCrew = state.crew.filter((pirate) => {
        return pirate !== plankedPirate
      })
      return Object.assign({}, state, {
        crew: filteredCrew,
        plankers: newPlankedPirates
      })
    default:
      return state;
  }
}

const addPirateToCrew = (newPirate) => {
  return {
    type: ADD_PIRATE,
    newPirate: newPirate
  }
}

const plankPirate = () => {
  return {
    type: PLANK_PIRATE
  }
}

newPirateForm.addEventListener('submit', () => {
  event.preventDefault();
  const pirateName = document.getElementById('name').value
  document.getElementById('name').value = ''
  store.dispatch(addPirateToCrew(pirateName))
})

plankButton.addEventListener('click', () => {
  if (store.getState().crew.length === 0) {
    alert(
      "Ahoy, matey! Ye cannay make a pirate walk the plank, if'n ye've got " +
      "narry a peg-leg or hook-fist aboard! Add more sea-rogues to " +
      "yer nefarious crew, and then ye can consign em all to the briny deep!"
    )
  } else {
    store.dispatch(plankPirate())
  }
})

const renderCrewList = () => {
  const crewList = document.getElementById('current-crew')
  let newCrewList = ''
  store.getState().crew.forEach((pirate) => {
    newCrewList += `<p>${pirate}</p>`
  });
  crewList.innerHTML = newCrewList
}

const renderPlankerList = () => {
  const plankerList = document.getElementById('walked-crew')
  let newPlankerList = ''
  store.getState().plankers.forEach((planker) => {
    newPlankerList += `<p>${planker}</p>`
  });
  plankerList.innerHTML = newPlankerList
}

const renderPlankerNum = () => {
  const plankerNum = document.getElementById('plank-walkers')
  plankerNum.innerHTML = store.getState().plankers.length
}

const store = createStore(crewReducer);

const render = () => {
  renderCrewList();
  renderPlankerList();
  renderPlankerNum();
}

render();
store.subscribe(render)
