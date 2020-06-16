const { createStore } = Redux;

const initialState = {
  crew: [
    "Unicorn Nick",
    "Sergeant Fang",
    "Sharp-Eye Kerrin"
  ]
}

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

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
