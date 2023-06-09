import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentForm from "./CommentForm";
import { format, parseISO } from 'date-fns'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment, onUpdateComment, onDeleteComment, userId }) => {
    const navigate = useNavigate();
    const [updatedComment, setUpdatedComment] = useState(comment);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setUpdatedComment(prevComment => ({
            ...prevComment,
            [name]: value
        }));
    }

    function formIsValid(){
        const { text } = updatedComment;
        const errors = {};
        if(!text) errors.text = "Comment text is required";
        if(text.length > 600) errors.name = "Comment text cant be longer then 600 characters";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(){
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        onUpdateComment(updatedComment).then(() => {
            toast.success("Comment updated");
            setSaving(false);
            setEditing(false);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error updating comment ${err.message}`, {
                autoClose: false
            });
        });
    }

    return (
        <div className="grid grid-cols-12 py-4 bg-backgroundOffset shadow rounded my-2">
            <div className="col-span-4 lg:col-span-2">
                <div className="flex flex-row">
                    <div className="flex ml-2">
                        <div className="flex flex-col">
                            <div className="flex">
                                <img src={comment.user.imageUrl} alt={`${comment.user.username} profile picture`} className={`rounded-full w-10 h-10 cursor-pointer`} onClick={() => {navigate(`/profile/${comment.user.id}`)}} />
                            </div>
                            <div className={`flex text-primary font-bold cursor-pointer`} onClick={() => {navigate(`/profile/${comment.user.id}`)}}>{comment.user.username}</div>
                            <div className="flex text-xs"><p>Posted: {format(parseISO(comment.createdDate), "dd/MM/yyyy HH:mm")}</p></div>
                            {format(parseISO(comment.updatedDate), "dd/MM/yyyy HH:mm") != format(parseISO(comment.createdDate), "dd/MM/yyyy HH:mm") && (
                                <div className="flex text-xs"><p>Updated: {format(parseISO(comment.updatedDate), "dd/MM/yyyy HH:mm")}</p></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-5 lg:col-span-8 px-4 border-primary border-l">{editing ? (
                <CommentForm comment={updatedComment} onChange={handleChange} onSubmit={handleSubmit} saving={saving} errors={errors} editing={true} />
            ) : (
                <p className="text-sm md:text-base">{comment.text}</p>
            )}</div>
            {comment.user.id == userId && (
                <div className="col-span-3 lg:col-span-2 px-4 border-primary border-l">
                    <div className="grid grid-cols-12">
                        <div className="col-span-6 md:col-span-12 justify-center md:justify-start">
                            <div onClick={() => setEditing(!editing)} className="inline-flex items-center justify-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`${editing ? 'text-red-400' : 'text-primary'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                {editing && (
                                    <span className="ml-1 text-red-400 font-bold">Cancel Editing</span>
                                )}
                            </div>
                        </div>
                        <div className="col-span-6 md:col-span-12 justify-center md:justify-start">
                            <svg onClick={() => onDeleteComment(comment)} xmlns="http://www.w3.org/2000/svg" className="text-red-400 h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    onUpdateComment: PropTypes.func.isRequired,
    onDeleteComment: PropTypes.func.isRequired,
    userId: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        userId: state.tokens ? state.tokens.id : null
    };
  };

  export default connect(mapStateToProps)(Comment);
