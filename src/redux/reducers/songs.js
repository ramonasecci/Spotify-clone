import { GET_SONGS } from '../actions'

const initialState = {
  results: [],
  genere1: [],
  genere2:[],
}

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS :
      return {
        ...state,
        results: action.payload,
        genere1: action.payload,
        genere2: action.payload,
      }
    default:
      return state
  }
}

export default songsReducer