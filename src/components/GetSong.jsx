import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getSongsAction } from '../redux/actions'
import ShowSongs from './ShowSongs'


const GetSong = ({genere}) => {

    const songs = useSelector((state) => state.songs.results)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getSongsAction(genere))
    }, [])
   

    return (
        <>
        <ShowSongs songs={songs}/>
        </>
    )
}

export default GetSong