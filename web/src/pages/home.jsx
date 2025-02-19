import { EventList } from "../components/events";
import { PageLayout } from "../components/layouts";

function HomePage() {
  return (
    <PageLayout>
      <h3 className="fw-light">What's on in Madrid</h3>
      <EventList city="Madrid" max={4} />

      <h3 className="fw-light">What's on in Barcelona</h3>
      <EventList city="Barcelona" max={4} />
    </PageLayout>
  );
}

export default HomePage;
