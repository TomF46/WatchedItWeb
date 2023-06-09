import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCreditsForPersonById, removeCredit } from "../../../api/creditsApi";
import { getPersonById } from "../../../api/peopleApi";
import PersonCreditsList from "../../../components/People/Credits/PersonCreditsList";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PersonMiniDetail from "../../../components/People/PersonMiniDetail";


function PersonCredits({isAdmin}) {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        if (!person) {
            getPerson();
            getCredits();
        }
    }, [id, person]);

    function getPerson() {
        getPersonById(id)
            .then((res) => {
                setPerson(res);
            })
            .catch((err) => {
                toast.error(`Error getting person ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function getCredits(){
        getCreditsForPersonById(id)
            .then((res) => {
                setCredits(res);
            })
            .catch((err) => {
                toast.error(`Error getting persons credits ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function handleRemoveCredit(credit){
        confirmAlert({
            title : "Confirm removal",
            message: `Are you sure you want to remove this credit?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteCredit(credit)
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function deleteCredit(credit){
        removeCredit(credit.id).then(() => {
            toast.success("Credit removed");
            getCredits();
        }).catch((err) => {
            toast.error(`Error removing persons credit ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="person-page">
            {!person ? (
                <LoadingMessage message={"Loading person"} />
            ) : (
                <>
                    <h1 className="text-primary text-center text-4xl my-4 font-bold">{person.fullName} credits</h1>
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md shadow rounded">
                            <div className="bg-backgroundOffset2 rounded-t-md">
                                <p className="text-primary font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/people/${person.id}/credits/add`}
                                    className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Add credit
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className="mt-4">
                        <PersonMiniDetail person={person} />
                        {credits && (
                            <>
                                {credits.cast.length + credits.crew.length == 0 && (
                                    <div className="my-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-primary mx-auto text-center">
                                            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                        <p className="text-center text-xl">This person does not have any credits.</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12">
                                        {credits.cast.length > 0 && (
                                            <>
                                                <h2 className="mt-4 text-primary text-xl ">Cast</h2>
                                                <PersonCreditsList credits={credits.cast} canEdit={isAdmin}  onRemove={handleRemoveCredit} />
                                            </>
                                        )}
                                    </div>
                                    <div className="col-span-12 mt-4">
                                        {credits.crew.length > 0 && (
                                            <>
                                                <h2 className="mt-4 text-primary text-xl ">Crew</h2>
                                                <PersonCreditsList credits={credits.crew} canEdit={isAdmin}  onRemove={handleRemoveCredit} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
  }
  
  PersonCredits.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(PersonCredits);

