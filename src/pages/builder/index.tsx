import { BodyBuilder } from './components/body';
import { HeaderBuilder } from './components/header';

export function BuilderPage() {
  return (
    <>
      <HeaderBuilder />
      <BodyBuilder />
    </>
  );
}
