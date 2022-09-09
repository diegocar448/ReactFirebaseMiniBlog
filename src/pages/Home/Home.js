//CSS
import styles from './Home.module.css';

//react
import { useState } from 'react';

//hooks
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//components
import PostDetail from '../../components/PostDetail';




const Home = () =>  {

	const [query, setQuery] = useState("");
	//passamos aqui a coleção de posts
	const {documents: posts, loading} = useFetchDocuments("posts");	
	//console.log(useFetchDocuments("posts"));

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (query) {
			return navigate(`/search?q=${query}`);
		}
	};

	return (
	<div className={styles.home}>
		<h1>Veja os nosso posts mais recentes</h1>
		<form onSubmit={handleSubmit} className={styles.search_form}>
			<input type="text" name="query" placeholder="Ou busque por tags..." onChange={ (e) => setQuery(e.target.value) } />    
			<button className='btn btn-dark'>Pesquisar</button>
		</form>
		<div>
			{/* esperar o posts chegar só então fazer o map */}
			{posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
			{posts && posts.length === 0 && (
				<div className={styles.noposts}>
					<p>Não foram encontrados posts</p>
					<Link to="/posts/create" className='btn'>Criar primeiro post</Link>
				</div>
			)}
		</div>
	</div>
	)
}

export default Home