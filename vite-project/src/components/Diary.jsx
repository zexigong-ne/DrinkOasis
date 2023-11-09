import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../assets/css/Diary.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState(null);
  const { otherId } = useParams(); 
  const navigate = useNavigate();
  const userId = checkUserLoginStatus(); // current user id

useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("user") !== null;

    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    const apiUrl = `/userApi/diaries?id=${otherId}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch diaries');
        }
      })
      .then((data) => {
        setDiaries(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [otherId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const isCurrentUserAuthor = (diaryUserId) => diaryUserId === userId;

  const handleDelete = (diaryId) => {
    
    const apiUrl = `/userApi/deleteDiary/${diaryId}?id=${userId}`;
  
    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          const diariesApiUrl = `/userApi/diaries?id=${userId}`;
          fetch(diariesApiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Failed to fetch diaries');
              }
            })
            .then((data) => {
              setDiaries(data);
            })
            .catch((error) => {
              console.error(error.message);
            });
        } else {
          throw new Error('Failed to delete diary');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };


  const handlePostDiaryClick = () => {
    navigate('/PostDiary');
  };

  const handleEditDiaryClick = (diaryId) => {
    navigate('/EditDiary', { state: { diaryId: diaryId } });
  };

  function checkUserLoginStatus() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user && user.id ? user.id : null;
  }
  
    return (
      <div className='diary-area'>
        <section className="title">
        <div className="diary-title">
          <h1>📖 Diaries</h1>
        </div>
        </section>
        <div className="centered-button">
          <div className='post-btn'>
          <button className="post btn btn-large" onClick={handlePostDiaryClick}>Post</button>
          </div>
        </div>
        
        <div>
          <ul className='diaryList'>
          {diaries.map((diary) => (
            <li key={diary.id} className='diaryItem'>
              <h4>{diary.title}</h4>
              <p>{diary.content}</p>
              {isCurrentUserAuthor(diary.userId) && (
              <div className='manage-btn'>
                <button className='btn delete-btn' onClick={() => handleDelete(diary.id)}>Delete</button>
                <button className='btn edit-btn' onClick={() => handleEditDiaryClick(diary.id)}>Edit</button>
              </div>
              )}
            </li>
          ))}
          </ul>  
        </div>
      </div>
    );
  };
  


export default Diary;
