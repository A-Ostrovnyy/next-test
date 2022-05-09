import Head from 'next/head';
import Image from 'next/image';

import { Button, Htag } from '../components';
import { ButtonAppearance, ButtonArrow } from '../components/Button/Button.props';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag="h1">CHildren text</Htag>
      <Htag tag="h2">CHildren text</Htag>
      <Htag tag="h3">CHildren text</Htag>
      <Button arrow={ButtonArrow.down} appearance={ButtonAppearance.primary}>Button text</Button>
      <Button arrow={ButtonArrow.right} appearance={ButtonAppearance.ghost}>Button text</Button>
    </div>
  );
}
