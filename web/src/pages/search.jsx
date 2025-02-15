import { useLocation, useSearchParams } from "react-router-dom";
import { EventList } from "../components/events";
import { PageLayout } from "../components/layouts";
import { GoogleAutocompleteInput } from "../components/google";

function SearchPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city');
  const max = queryParams.get('max');
  const page = queryParams.get('page');
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');

  function handlePageChange(page) {
    page = Math.max(0, page);
    setSearchParams({ city, max, page });
  }

  function handlePlaceChange(location) {
    const { lat, lng, city } = location;
    console.log(location);
    setSearchParams({ city, max, page: 0, lat, lng });
  }

  return (
    <PageLayout>
      <GoogleAutocompleteInput className="mb-3" onPlaceChange={handlePlaceChange} />
      <h3 className="fw-light">What's on in {city}</h3>
      <EventList city={city} max={max} page={Math.max(page, 0)} lat={lat} lng={lng} />
      <button className="btn btn-secondary me-1 btn-sm" onClick={() => handlePageChange(Number(page) - 1)}>Prev</button>
      <button className="btn btn-primary btn-sm" onClick={() => handlePageChange(Number(page) + 1)}>Next</button>
    </PageLayout>
  )
}

export default SearchPage;