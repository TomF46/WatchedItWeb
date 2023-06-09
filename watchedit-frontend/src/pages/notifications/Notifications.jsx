import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { decrementNotificationCount } from "../../redux/actions/notificationCountActions";
import { getAllNotifications, readNotification } from "../../api/notificationApi";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import NotificationsList from "../../components/Notifications/NotificationsList";
import PaginationControls from "../../components/PaginationControls";

const NotificationsPage = ({ decrementNotificationCount, notificationCount }) => {
    const [notificationsPaginator, setNotificationsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const notificationsPerPage = 32;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!notificationsPaginator) {
            getNotifications();
        }
    }, [notificationsPaginator]);

    useEffect(() => {
        if (lastPageLoaded != null) getNotifications();
    }, [page]);

    function getNotifications() {
        getAllNotifications(page, notificationsPerPage).then(notificationsData => {
            setNotificationsPaginator(notificationsData);
            setLastPageLoaded(page);
        }).catch(error => {
            toast.error(`Error getting notifications ${error.message}`, {
                autoClose: false,
            });
        });
    }

    function handleReadNotification(notification) {

        if (notification.read) return;
        readNotification(notification.id).then(() => {
            decrementNotificationCount();
            getNotifications();
        }).catch(error => {
            toast.error(`Error reading notification ${error.message}`, {
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
        <div className="Notifications-page">
            {!notificationsPaginator ? (
                <LoadingMessage message={"Loading notifications"} />
            ) : (
                <div>
                    <h1 className="text-center text-primary text-4xl my-4 font-bold">
                        Notifications {`(${notificationCount})`}
                    </h1>
                    {notificationsPaginator.data.length > 0 ? (
                        <>
                            <NotificationsList notifications={notificationsPaginator.data} onSetRead={handleReadNotification} />
                            <PaginationControls
                                currentPage={page}
                                onNext={handleNextPage}
                                onPrevious={handlePreviousPage}
                                of={notificationsPaginator.of}
                                from={notificationsPaginator.from}
                                to={notificationsPaginator.to}
                                lastPage={notificationsPaginator.lastPage}
                            />
                        </>
                    ) :(
                        <p className="text-center text-primary text-2xl">
                            You have no notifications
                        </p>
                    )}
                </div>
            )}
        </div >
    );
};

NotificationsPage.propTypes = {
    notificationCount: PropTypes.number.isRequired,
    decrementNotificationCount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        notificationCount: state.notificationCount
    };
};

const mapDispatchToProps = {
    decrementNotificationCount
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);
