import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { setFilmNotWatchedById, setFilmWatchedById } from "../../../api/watchedFilmsApi";
import { toast } from "react-toastify";

const WatchedFilmControls = ({ film }) => {
    const navigate = useNavigate();
    const [hasWatched, setHasWatched] = useState(null);

    useEffect(() => {
        setHasWatched(film.isWatchedByUser);
    }, [film]);

    function setWatched(){
        setFilmWatchedById(film.id).then(res => {
            setHasWatched(res.watched);
        }).catch(err => {
            toast.error(`Error setting film watched${err.message}`, {
                autoClose: false,
            });
        });
    }

    function setNotWatched(){
        setFilmNotWatchedById(film.id).then(res => {
            setHasWatched(res.watched);
        }).catch(err => {
            toast.error(`Error setting film not watched${err.message}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div>
            {hasWatched == null ? (
                <p>Loading ...</p>
            ) : (
                <>
                    <p>user has watched film: {hasWatched ? "True" : "False"}</p>
                    {hasWatched ? (
                        <button onClick={() => setNotWatched()} className="p-4 bg-primary">
                            Set not watched
                        </button>
                    ): (
                        <button onClick={() => setWatched()} className="p-4 bg-primary">
                            Set watched
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

WatchedFilmControls.propTypes = {
    film: PropTypes.object.isRequired,
};

export default WatchedFilmControls;
