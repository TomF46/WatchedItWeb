import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewOverviewList from "../../../components/Films/Reviews/ReviewOverviewList";
import PaginationControls from "../../../components/PaginationControls";
import { getUserById, getUsersReviewsPaginated } from "../../../api/usersApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function UserReviews({currentUserId}) {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [reviewsPaginator, setReviewsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const reviewsPerPage = 20;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        let targetId = id ? id : currentUserId;
        if (!user) {
            getUser(targetId);
            getReviews(targetId);
        }
    }, [id]);

    useEffect(() => {
        if (lastPageLoaded != null) getReviews();
    }, [page]);

    function getUser(userId) {
        getUserById(userId)
            .then((res) => {
                setUser(res);
            })
            .catch((err) => {
                toast.error(`Error getting user ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function getReviews(userId) {
        getUsersReviewsPaginated(userId, page, reviewsPerPage)
            .then((res) => {
                setReviewsPaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting users reviews ${err.data.Exception}`, {
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
        <div className="users-reviews-page">
            {!user ? (
                <LoadingMessage message={"Loading user."} />
            ) : (
                <>
                    <div>
                        <h1 className="text-center text-primary text-4xl my-4 font-bold">{user.username} reviews</h1>
                        {reviewsPaginator ? (
                            <>
                                {reviewsPaginator.data.length > 0 ? (
                                    <>
                                        <ReviewOverviewList reviews={reviewsPaginator.data} showFilm/>
                                        <PaginationControls
                                            currentPage={page}
                                            onNext={handleNextPage}
                                            onPrevious={handlePreviousPage}
                                            of={reviewsPaginator.of}
                                            from={reviewsPaginator.from}
                                            to={reviewsPaginator.to}
                                            lastPage={reviewsPaginator.lastPage}
                                        />
                                    </>
                                ) : (
                                    <p className="text-center text-primary text-2xl">User has not added any reviews</p>
                                )}
                            </>
                        ):(
                            <LoadingMessage message={"Loading reviews."} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

UserReviews.propTypes = {
    currentUserId: PropTypes.any.isRequired
};

const mapStateToProps = (state) => {
    return {
        currentUserId: state.tokens ? state.tokens.id : null
    };
};

export default connect(mapStateToProps)(UserReviews);

