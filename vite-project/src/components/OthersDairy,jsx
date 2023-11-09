import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams here
import '../assets/css/Diary.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Diary = () => {
  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams(); // This assumes the route has a parameter named `userId`
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser) {
      navigate('/Login');
      return;
    }

    // Determine if we are fetching the current user's diaries or another user's
    const userToFetch = userId || currentUser.id;
    const apiUrl = `/userApi/diaries?id=${userToFetch}`;

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
  }, [userId, currentUser, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = (diaryId) => {
    // Delete functionality remains the same
  };

  // Only show edit and delete buttons for the current user's diaries
  const showManageButtons = (diaryUserId) => {
    return currentUser && diaryUserId === currentUser.id;
  };

  return (
    <div className='diary-area'>
      {/* ... */}
      <div>
        <ul className='diaryList'>
        {diaries.map((diary) => (
          <li key={diary.id} className='diaryItem'>
            <h4>{diary.title}</h4>
            <p>{diary.content}</p>
            {showManageButtons(diary.userId) && ( // Only show if the diary belongs to the current user
              <div className='manage-btn'>
                <button className='btn delete-btn' onClick={() => handleDelete(diary.id)}>Delete</button>
                <button className='btn edit-btn' to={`/edit/${diary.id}`}>Edit</button>
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
