import { useLocation, useSearchParams } from "react-router-dom";
import { EventList } from "../components/events";
import { PageLayout } from "../components/layouts";

function SearchPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city');
  const max = queryParams.get('max');
  const page = queryParams.get('page');

  function handlePageChange(page) {
    page = Math.max(0, page);
    setSearchParams({ city, max, page });
  }

  return (
    <PageLayout>
      <h3 className="fw-light">What's on in {city}</h3>
      <EventList city={city} max={max} page={Math.max(page, 0)} />
      <button className="btn btn-secondary me-1 btn-sm" onClick={() => handlePageChange(Number(page) - 1)}>Prev</button>
      <button className="btn btn-primary btn-sm" onClick={() => handlePageChange(Number(page) + 1)}>Next</button>
    </PageLayout>
  )
}

export default SearchPage;