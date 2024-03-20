import React, { useEffect } from "react";
import './Section1.css';
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from '../../../Redux/actions/user';
import { GetAllPost, GetViewsAndLikes, TrainModel } from "../../../Redux/actions/posts";

function Section1 () {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(GetAllUsers());
        dispatch(GetViewsAndLikes());
        dispatch(GetAllPost())
    }, [dispatch])
    const users = useSelector((state) =>state.userReducer.users)
    const viewsAndLikes = useSelector((state) => state.postReducer.viewsAndLikes)
    const Posts = useSelector((state) => state.postReducer.AllPost)
    const trainmodel = () => {
        dispatch(TrainModel())
    }
    const ResultTrain = useSelector((state) => state.postReducer.trainingResult);
    useEffect(() => {
       if (ResultTrain.msg === "200")
       {
        alert("You have trained your model succesfully");
       }
    },[ResultTrain])
return(
    <div className='cardBox'>
        <div className='card'>
            <div>
                <div className='numbers'>{users !== undefined ? users.length : 0}</div>
                <div className='cardName'>Total Accounts</div>
            </div>
            <div className='iconBx'>
                <ion-icon name="people-outline"></ion-icon>
            </div>
        </div>
        <div className='card'>
            <div>
                <div className='numbers'>{Posts !== undefined ? Posts.length : 0}</div>
                <div className='cardName'>Total Posts</div>
            </div>
            <div className='iconBx'>
            <ion-icon name="pricetags-outline"></ion-icon>
            </div>
        </div>
        <div className='card'>
            <div>
                <div className='numbers'>{viewsAndLikes.Views !== undefined ? viewsAndLikes.Views.length : 0}</div>
                <div className='cardName'>Total Posts Views</div>
            </div>
            <div className='iconBx'>
                <ion-icon name='eye-outline'/>
            </div>
        </div>
        <div className='card'>
            <div>
                <div className='numbers'>{viewsAndLikes.Likes !== undefined ? viewsAndLikes.Likes.length : 0}</div>
                <div className='cardName'>Total Likes</div>
            </div>
            <div className='iconBx'>
                <ion-icon name="thumbs-up-outline"></ion-icon>
            </div>
        </div>
        <div className="card second" onClick={() => {trainmodel()}}>
            <span>Train model</span>
            <ion-icon name="construct-outline"></ion-icon>
        </div>
    </div>

);
}
export default Section1;