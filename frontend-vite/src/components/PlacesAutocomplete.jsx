import React, { useEffect, useRef } from 'react';

export default function PlacesAutocomplete({ 
  placeholder, 
  value, 
  onChange, 
  onPlaceSelected,
  className = "",
  required = false 
}) {
  const inputRef = useRef(null);
  const autocompleteElementRef = useRef(null);

  useEffect(() => {
    // Wait for Google Maps to load
    const initAutocomplete = async () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        setTimeout(initAutocomplete, 100);
        return;
      }

      if (!inputRef.current) return;


      try {
        // Check if PlaceAutocompleteElement is available
        if (!window.google.maps.places.PlaceAutocompleteElement) {
          return;
        }

        // Create the new PlaceAutocompleteElement
        const placeAutocomplete = new window.google.maps.places.PlaceAutocompleteElement({
          locationRestriction: {
            country: ['IN'] // Restrict to India
          },
          fields: ['displayName', 'formattedAddress', 'location', 'addressComponents']
        });

        autocompleteElementRef.current = placeAutocomplete;

        // Style the autocomplete element to match the input
        placeAutocomplete.classList.add(...className.split(' '));
        
        // Replace the input with the autocomplete element
        inputRef.current.parentNode.replaceChild(placeAutocomplete, inputRef.current);

        // Add listener for place selection
        placeAutocomplete.addEventListener('gmp-placeselect', async (event) => {
          
          try {
            const place = await event.place;

            if (place) {
              await place.fetchFields({
                fields: ['displayName', 'formattedAddress', 'location']
              });


              if (place.location) {
                const locationData = {
                  address: place.formattedAddress || place.displayName || '',
                  latitude: place.location.lat,
                  longitude: place.location.lng
                };


                // Update the parent component
                onChange({ target: { value: locationData.address } });
                
                if (onPlaceSelected) {
                  onPlaceSelected(locationData);
                }
              }
            }
          } catch (error) {
          }
        });

        // Set initial value if provided
        if (value) {
          placeAutocomplete.value = value;
        }

      } catch (error) {
        
        // Fallback to old API if new one fails
        initLegacyAutocomplete();
      }
    };

    // Fallback function for legacy API
    const initLegacyAutocomplete = () => {
      if (!inputRef.current) return;

      try {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode', 'establishment'],
          componentRestrictions: { country: 'in' },
          fields: ['formatted_address', 'geometry', 'name']
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          
          if (place && place.geometry && place.geometry.location) {
            const locationData = {
              address: place.formatted_address || place.name || '',
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng()
            };
            
            
            inputRef.current.value = locationData.address;
            onChange({ target: { value: locationData.address } });
            
            if (onPlaceSelected) {
              onPlaceSelected(locationData);
            }
          }
        });
      } catch (error) {
      }
    };

    initAutocomplete();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={className}
      autoComplete="off"
    />
  );
}