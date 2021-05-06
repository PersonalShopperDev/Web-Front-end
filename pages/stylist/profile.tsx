import Layout from "../../src/layouts/default";
import Navigation from '../../src/components/navigation';
import StylistProfile from "../../src/templates/stylistProfile";
import { withRouter } from 'next/router';

const profile = ({ router: { query } }) => {
  const stylist = JSON.parse(query.stylist);

  return (
    <Layout
      Main={
        <StylistProfile info={stylist}/>
      }
      Navigation={
        <Navigation />
      }
    />
  )
}

export default withRouter(profile);