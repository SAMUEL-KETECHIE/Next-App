import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/AppLayout';

const Index = props=>(
    <Layout>
        <h1> The Avengers Show</h1>
        <ul>
            {
                props.show.map(show=>(
                    <li key={show.id}>
                        <Link href="/p/[id]" as={`/p/${show.id}`}>
                <a>{show.name}</a>
                        </Link>
                    </li>

                ))
            }
        </ul>
    </Layout>
);


Index.getInitialProps = async function (){
    const showEndpoint= "https://api.tvmaze.com/search/shows?q=avengers";
    const showResult = await fetch(showEndpoint);
    const resultData=await showResult.json();

    console.log(`Number of show data count is : ${resultData.length}`)

    return {
        shows : resultData.map(e=>e.show)
    };
}

export default Index;