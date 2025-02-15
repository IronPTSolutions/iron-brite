import { useEffect, useRef } from "react";

const autocompleteOptions = {
  componentRestrictions: { country: 'es' },
  type: ["address"]
}


function GoogleAutocompleteInput({ className = '', onPlaceChange = () => {} }) {
  const autocompleteInput = useRef();

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput.current, autocompleteOptions);
    window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry?.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
          city: place.address_components.find((component) => component.types.includes('locality'))?.short_name
        }
        onPlaceChange(location);
      }
    });

    return () => {
      window.google.maps.event.clearListeners(autocomplete, 'place_changed');
    }
  }, []);

  return (
    <div className={`input-group ${className}`}>
      <span className="input-group-text"><i className="fa fa-map-marker"></i></span>
      <input ref={autocompleteInput} type="text" className="form-control" placeholder="Find events near by..." aria-label="Username" />
    </div>
  )
}

export default GoogleAutocompleteInput;