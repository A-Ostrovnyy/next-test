import { Button, P, Htag, Tag } from '../components';
import { ButtonAppearance, ButtonArrow } from '../components/Button/Button.props';
import { PSize } from '../components/P/P.props';
import { TagColor, TagSize } from '../components/Tag/Tag.props';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">CHildren text</Htag>
      <Htag tag="h2">CHildren text</Htag>
      <Htag tag="h3">CHildren text</Htag>
      <Button arrow={ButtonArrow.down} appearance={ButtonAppearance.primary}>Button text</Button>
      <Button arrow={ButtonArrow.right} appearance={ButtonAppearance.ghost}>Button text</Button>
      <P size={PSize.small}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque iusto maxime aliquam libero reiciendis atque.</P>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque iusto maxime aliquam libero reiciendis atque.</P>
      <P size={PSize.large}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque iusto maxime aliquam libero reiciendis atque.</P>
      <Tag>Tag text</Tag>
      <Tag size={TagSize.small}>Tag text</Tag>
      <Tag color={TagColor.green}>Tag text</Tag>
      <Tag color={TagColor.grey}>Tag text</Tag>
      <Tag color={TagColor.primary}>Tag text</Tag>
      <Tag color={TagColor.red}>Tag text</Tag>
    </div>
  );
}
