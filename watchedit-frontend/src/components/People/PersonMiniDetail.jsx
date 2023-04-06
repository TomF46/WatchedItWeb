import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PersonMiniDetail = ({ person }) => {
    return (
        <div className="grid grid-cols-12">
           <div className="col-span-12 md:col-span-4">
                <div className="grid grid-cols-12 bg-backgroundOffset">
                    <div className="col-span-2">
                        <img src={person.imageUrl} className="h-full headshot" />
                    </div>
                    <div className="col-span-10 p-2">
                        <Link to={`/people/${person.id}`} className="text-primary font-bold hover:opacity-75">{person.fullName}</Link>
                        <p>{person.description}</p>
                    </div>
                </div>
           </div>
        </div>
    );
};

PersonMiniDetail.propTypes = {
    person: PropTypes.object.isRequired,
};

export default PersonMiniDetail;
