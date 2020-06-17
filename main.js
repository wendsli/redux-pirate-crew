const { createStore } = Redux;

const initialState = {
  crew: [
    "Unicorn Nick",
    "Sergeant Fang",
    "Sharp-Eye Kerrin"
  ]
}

const ADD_PIRATE = 'ADD_PIRATE'

const newPirateForm = document.getElementById('new-pirate-form')

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PIRATE:
      const newCrewArray = state.crew.concat(action.newPirate)
      return Object.assign({}, state, {
        crew: newCrewArray
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

newPirateForm.addEventListener('submit', () => {
  event.preventDefault();
  const pirateName = document.getElementById('name').value
  document.getElementById('name').value = ''
  store.dispatch(addPirateToCrew(pirateName))
})

const renderCrewList = () => {
  const crewList = document.getElementById('current-crew')
  let newCrewList = ''
  store.getState().crew.forEach((pirate) => {
    newCrewList += `<p>${pirate}</p>`
  });
  crewList.innerHTML = newCrewList
}

const store = createStore(crewReducer);

const render = () => {
  renderCrewList();
}

render();
store.subscribe(render)
