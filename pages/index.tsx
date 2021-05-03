import Layout from "../src/layouts/default";
import Navigation from '../src/components/navigation';
import StyleistView from "../src/templates/stylelistView";

export default function Home() {
  return (
    <Layout
      Main={
        <StyleistView />
      }
      Navigation={
        <Navigation />
      }
    />
  )
}