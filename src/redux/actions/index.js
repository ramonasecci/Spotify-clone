export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE'
export const REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE'
export const GET_SONGS = 'GET_SONGS'

const baseEndpoint = 'https://striveschool-api.herokuapp.com/api/deezer/search?q='

export const addToFavouriteAction = (song) => ({
  type: ADD_TO_FAVOURITE,
  payload: song,
})

export const removeFromFavouriteAction = (song) => ({
  type: REMOVE_FROM_FAVOURITE,
  payload: song,
})

export const getSongsAction = (query) => {
  return async (dispatch) => {
    try {
      const response = await fetch(baseEndpoint + query )
      if (response.ok) {
        const { data } = await response.json()
        
        dispatch({
          type: GET_SONGS,
          payload: data,
        })
      } else {
        alert('Error fetching results')
      }
    } catch (error) {
      console.log(error)
    }
  }
}