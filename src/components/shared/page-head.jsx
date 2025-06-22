import { Helmet } from 'react-helmet-async';

function PageHead({ title = 'Kutubi' }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageHead;