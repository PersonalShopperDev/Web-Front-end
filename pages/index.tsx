import Layout from "../src/layouts/default";
import Navigation from '../src/components/navigation';
import StylistListView from "../src/templates/stylistListView";

export default function Home() {
  return (
    <Layout
      Main={
        <StylistListView />
      }
      Navigation={
        <Navigation />
      }
    />
  )
}