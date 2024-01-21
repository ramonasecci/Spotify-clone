import React, { useState, useRef, useEffect } from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import Next from "../data/images/Next.png";
import Play from "../data/images/Play.png";
import Pause from "../data/images/pause.png";
import Previous from "../data/images/Previous.png";
import Repeat from "../data/images/Repeat.png";
import Shuffle from "../data/images/Shuffle.png";

const MediaPlayer = () => {
    const song = useSelector((state) => state.track.song);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [formattedTime, setFormattedTime] = useState("0:00 / 0:00");
    const audioRef = useRef(null);

    useEffect(() => {
        const updateProgressBar = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
                setFormattedTime(formatTime(audioRef.current.currentTime));
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            setFormattedTime("0:00 / 0:00");
        };

        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", updateProgressBar);
            audioRef.current.addEventListener("ended", handleEnded);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("timeupdate", updateProgressBar);
                audioRef.current.removeEventListener("ended", handleEnded);
            }
        };
    }, []);

    const playPauseHandler = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const seekHandler = (e) => {
        if (audioRef.current) {
            const seekTime = e.target.value;
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
            setFormattedTime(formatTime(seekTime));
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        const totalMinutes = Math.floor(song.track.duration / 60);
        const totalSeconds = Math.floor(song.track.duration % 60);

        const formattedCurrent = `${minutes}:${formattedSeconds}`;
        const formattedTotal = `${totalMinutes}:${totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}`;

        return `${formattedCurrent} / ${formattedTotal}`;
    };

    return (
        <div className="container-fluid fixed-bottom bg-container pt-1">
            <Row>
                {song.track && (
                    <>
                        <Col xs={5}>
                            <div className="d-flex align-items-center">
                                <img src={song.track.album.cover_small} alt="track" />
                                <p className="text-white ms-3">{song.track.title}</p>
                            </div>
                        </Col>
                        <Col xs={4} className="playerControls c-player">
                            <Row className="d-flex justify-content-center">
                                <Col xs={12} className="d-flex justify-content-center">
                                    <Row>
                                        <Col>
                                            <img src={Shuffle} alt="shuffle" />
                                        </Col>
                                        <Col>
                                            <img
                                                src={Previous}
                                                alt="previous"
                                                width={10}
                                                height={10}
                                            />
                                        </Col>
                                        <Col>
                                            <img
                                                src={isPlaying ? Pause : Play}
                                                alt={isPlaying ? "pause" : "play"}
                                                width={10}
                                                height={10}
                                                onClick={playPauseHandler}
                                            />
                                        </Col>
                                        <Col>
                                            <img src={Next} alt="next" width={10} height={10} />
                                        </Col>
                                        <Col>
                                            <img src={Repeat} alt="repeat" width={10} height={10} />
                                        </Col>
                                    </Row>
                                    <Col xs={2} className="text-white ms-5 my-2" style={{ whiteSpace: 'nowrap' }}>
                                        {formattedTime}
                                    </Col>

                                </Col>
                                <Col xs={12} className="mt-1">
                                    <ProgressBar
                                        now={(currentTime / (song.track.duration || 1)) * 100}
                                        onChange={seekHandler}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </>
                )}
            </Row>
            {song.track && (
                <audio ref={audioRef} src={song.track.preview} />
            )}
        </div>
    );
};

export default MediaPlayer;
