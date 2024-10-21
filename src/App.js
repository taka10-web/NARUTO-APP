import { useEffect ,useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  //キャラクター情報の管理
  const  [characters, setCharacters] = useState([]);
  //ページを管理するstate
  const [page,setPage] =useState(1);
  //ロード状態を管理する
  const [isLoading, setIsLoading] = useState(false);

  //初回表示キャラクターを取得
  useEffect (() => {
    fectchCharacters();
  } , []);

  const limit = 15;

  //キャラクターを取得
  const fectchCharacters = async (page) => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    setIsLoading(true);
    const result = await axios.get(apiUrl,{params: { page: page , limit }});
    setCharacters(result.data.characters);
    setIsLoading(false);

  }

  //次のページに移動
const handleNext = async () => {
  const nextPage = page + 1;
  fectchCharacters(nextPage);
  setPage(nextPage);
}

//前のページ
const handlePrevios = async () => {
const previosPage = page - 1;
fectchCharacters(previosPage);
setPage(previosPage);
} 

  return (
    <div className="container">
      <div className='header'>
        <div className='header-content'>
          <img src='logo.png' alt='logo' className='logo' />
        </div>
      </div>
      {isLoading ? <div>Now Loading...</div> : 
      <main>
        <div className='cards-container'>
          {characters.map((character) => {
            return <div className='card' key={character.id}>
              <img src={character.images[0] != null 
              ? character.images[0]
              : 'dummy.png' 
              
            } alt='character'className='card-image'/>
            <div className='card-content'>
              <h3 className='card-title'>{character.name}</h3>
              <p className='card-description'>
                {character.debut?.appearsIn ?? 'なし' }
              </p>
              <div className='card-footer'>
                <span className='affliation'>
                  {character.personal?.affiliation ?? 'なし'}
                </span>
              </div>
            </div>
            </div>;
          })}
        </div>
        <div className='pager'>
          <button className='prev' disabled={page === 1} onClick={handlePrevios}>Previos</button>
          <span className='page-number'>{page}</span>
          <button 
          disabled={limit > characters.length}
          className='next' 
          onClick={handleNext}>Next</button>
        </div>
      </main>
        }
    </div>
  );
}

export default App;
