import { useState } from 'react';
import { Link } from 'react-router-dom';

const Diary = () => {
    // Move the state and logic for diaries to the parent component (Diary)
    const [diaries, setDiaries] = useState([
      { id: 1, text: 'Diary Entry 1' },
      { id: 2, text: 'Diary Entry 2' },
    ]);
  
    // const addDiary = (newDiary) => {
    //   setDiaries([...diaries, newDiary]);
    // };
  
    const handleDelete = (id) => {
      const updatedDiaries = diaries.filter((diary) => diary.id !== id);
      setDiaries(updatedDiaries);
    };
  
    return (
      <main className='main'>
        <Link to="/PostDiary">Post</Link> {/* "Post" button links to /PostDiary */}
        <div>
          <h2>📖 Diaries</h2>
          {diaries.map((diary) => (
            <div key={diary.id}>
              <p>{diary.text}</p>
              <button onClick={() => handleDelete(diary.id)}>Delete</button>
              <Link to={`/edit/${diary.id}`}>Edit</Link>
            </div>
          ))}  
        </div>
      </main>
    );
  };
  


export default Diary;
