import Spinner from 'src/components/Spinner';

const Loader = ({ fullPage = true }) => {
    return <Spinner fullPage={fullPage} size="lg" />;
};

export default Loader;
