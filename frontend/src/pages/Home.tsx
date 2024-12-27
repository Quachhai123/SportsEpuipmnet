import Hero from '../components/Hero'
import NewsLetter from '../components/NewsLetter'
import Offer from '../components/Offer'
import Popular from '../components/Popular'
import SearchProduct from '../components/SearchProduct'

const Home = () => {
    return (
        <>
            <Hero />
            <SearchProduct />
            <Offer />
            <Popular />
            <NewsLetter />
        </>
    )
}

export default Home
