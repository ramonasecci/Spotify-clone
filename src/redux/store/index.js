import { configureStore, combineReducers } from '@reduxjs/toolkit'
import favouriteReducer from '../reducers/myplaylist'
import songsReducer from '../reducers/songs'

const bigReducer = combineReducers({
  favourite: favouriteReducer,
  songs: songsReducer,
})

const store = configureStore({
  reducer: bigReducer,
})

export default store