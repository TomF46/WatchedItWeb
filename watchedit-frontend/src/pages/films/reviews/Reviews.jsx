import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmById } from "../../../api/filmsApi";
import { getReviewsByFilmId } from "../../../api/filmReviewApi";
import ReviewOverviewList from "../../../components/Films/Reviews/ReviewOverviewList";
import PaginationControls from "../../../components/PaginationControls";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import FilmMiniDetail from "../../../components/Films/FilmMiniDetail";

function Reviews() {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [reviewsPaginator, setReviewsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const reviewsPerPage = 20;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!film) {
            getFilm();
            getReviews();
        }
    }, [id, film]);

    useEffect(() => {
        if (lastPageLoaded != null) getReviews();
    }, [page]);

    function getFilm() {
        getFilmById(id)
            .then((res) => {
                setFilm(res);
            })
            .catch((err) => {
                toast.error(`Error getting film ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function getReviews() {
        getReviewsByFilmId(id, page, reviewsPerPage)
            .then((res) => {
                setReviewsPaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting film reviews ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function handleNextPage() {
        var newPage = page + 1;
        setPage(newPage);
    }

    function handlePreviousPage() {
        var newPage = page - 1;
        setPage(newPage);
    }

    return (
        <div className="film-reviews-page">
            {!film ? (
                <LoadingMessage message={"Loading film"} />
            ) : (
                <>
                    <h1 className="text-center text-primary text-4xl mt-4 mb-2 font-bold">{film.name} reviews</h1>
                    {film.averageRating && (<p className="text-center text-primary text-xl mb-4">Average rating: {film.averageRating}</p>)}
                    <div className="review-controls bg-backgroundOffset mt-4 rounded-md">
                        <div className="bg-backgroundOffset2 rounded-t-md">
                            <p className="text-primary font-bold text-lg px-2 py-1">
                                Review controls
                            </p>
                        </div>
                        <div className="px-2 py-2">
                            <Link
                                to={`/films/${film.id}/reviews/add`}
                                className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
                            >
                                Add review
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <FilmMiniDetail film={film} />
                        {reviewsPaginator ? (
                            <>
                                {reviewsPaginator.data.length > 0 ? (
                                    <div className="mt-4">
                                        <ReviewOverviewList reviews={reviewsPaginator.data} showFilm={false} />
                                        <PaginationControls
                                            currentPage={page}
                                            onNext={handleNextPage}
                                            onPrevious={handlePreviousPage}
                                            of={reviewsPaginator.of}
                                            from={reviewsPaginator.from}
                                            to={reviewsPaginator.to}
                                            lastPage={reviewsPaginator.lastPage}
                                        />
                                    </div>
                                ) : (
                                    <div className="py-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-primary mx-auto text-center">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                        <p className="text-center text-xl">This film currently has no reviews. <Link to={`/films/${film.id}/reviews/add`} className="text-primary hover:opacity-75">Add one now.</Link></p>
                                    </div>
                                )}
                            </>
                        ):(
                            <LoadingMessage message={"Loading reviews"} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Reviews;

