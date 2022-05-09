import { Button, P, Htag } from '../components';
import { ButtonAppearance, ButtonArrow } from '../components/Button/Button.props';
import { PSize } from '../components/P/P.props';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">CHildren text</Htag>
      <Htag tag="h2">CHildren text</Htag>
      <Htag tag="h3">CHildren text</Htag>
      <Button arrow={ButtonArrow.down} appearance={ButtonAppearance.primary}>Button text</Button>
      <Button arrow={ButtonArrow.right} appearance={ButtonAppearance.ghost}>Button text</Button>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque iusto maxime aliquam libero reiciendis atque.</P>
      <P size={PSize.medium}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque iusto maxime aliquam libero reiciendis atque.</P>
      <P size={PSize.large}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque iusto maxime aliquam libero reiciendis atque.</P>
    </div>
  );
}
