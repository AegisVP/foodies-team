import Header from 'src/components/Header';
import css from './Hero.module.css';
import Button from '../Button';
import ROUTES from 'src/navigation/routes.js';


const Hero = () => {

  return (
    <div className={css.component}>
      <Header />

      <h1 className={css.title}>Improve Your Culinary Talents</h1>
      <p className={css.subtitle}>Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.</p>

      <Button
        label='Add Recipe'
        to={ROUTES.ADD_RECIPE_PAGE}
        theme='light-transparent'
        className={css.button}
        />

      <div className={css.images}>
        <img
          src="/images/hero-dish-1.jpg"
          srcSet="
            /images/hero-dish-1.jpg 1x,
            /images/hero-dish-1@2x.jpg 2x,
            /images/hero-dish-1@3x.jpg 3x
          "
          alt="Delicious dish"
        />
        <img
          src="/images/hero-dish-2.jpg"
          srcSet="
            /images/hero-dish-2.jpg 1x,
            /images/hero-dish-2@2x.jpg 2x,
            /images/hero-dish-2@3x.jpg 3x
          "
          alt="Another tasty meal"
        />
      </div>
    </div>
  );
}

export default Hero;
