"use client";

import React, { useState } from "react";

// import { useRouter } from "next/navigation";
import Image from "next/image";
// import { toast } from "sonner";
import LocationPickerMap from "./mapSelector";

const VenueCreate = () => {
  const [venueName, setVenueName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [available, setAvailable] = useState(true);
  // const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  //   const [createVenue, { isLoading }] = useCreateVenueMutation();
  //   const router = useRouter();

  /*   const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(
    null
  ); */

  /*  const handleLocationSelect = (
    lat: number,
    lng: number,
    addr: string,
    name?: string,
    photoUrl?: string
  ) => {
    setLatitude(lat.toString());
    setLongitude(lng.toString());
    setAddress(addr);

    if (name) setVenueName(name);

    if (photoUrl) {
      setCoverPhotoPreview(photoUrl); 
      fetch(photoUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "venue-photo.jpg", { type: blob.type });
          setCoverPhoto(file);
        });
    }
  }; */

  const [coverPhotos, setCoverPhotos] = useState<File[]>([]);
  const [coverPhotoPreviews, setCoverPhotoPreviews] = useState<string[]>([]);

  const handleLocationSelect = (
    lat: number,
    lng: number,
    addr: string,
    place?: google.maps.places.PlaceResult
  ) => {
    setLatitude(lat.toString());
    setLongitude(lng.toString());
    setAddress(addr);

    // Only set venue name if user hasn't typed anything
    if (place?.name && venueName.trim() === "") {
      setVenueName(place.name);
    }

    // Only set images if user hasn't uploaded any manually
    if (place?.photos?.length && coverPhotos.length === 0) {
      const urls = place.photos.map((photo) =>
        photo.getUrl({ maxWidth: 800, maxHeight: 600 })
      );
      setCoverPhotoPreviews(urls);

      // Convert all URLs to File objects
      Promise.all(
        urls.map((url) =>
          fetch(url)
            .then((res) => res.blob())
            .then(
              (blob) => new File([blob], "venue-photo.jpg", { type: blob.type })
            )
        )
      ).then((files) => setCoverPhotos(files));
    }

    console.log("Full Place Response venue page:", place);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /*  if (!venueName || !latitude || !longitude || !coverPhoto) {
      toast.error("Please fill in all fields and select a cover photo.");
      return;
    }
 */
    const bodyData = {
      venueName,
      available,
      address,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    };

    // Log all form values
    console.log("=== Form Values ===");
    console.log("Venue Name:", venueName);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Address:", address);
    console.log("Available:", available);
    console.log("Cover Photo File:", coverPhotos);
    console.log("Cover Photo Preview URL:", coverPhotoPreviews);

    const formData = new FormData();
    formData.append("bodyData", JSON.stringify(bodyData));
    // formData.append("coverPhoto", coverPhoto);

    /*  try {
      const response = await createVenue(formData);
      console.log("API Response:", response);
      if (response.data) {
        toast.success("Venue created successfully!");
        setVenueName("");
        setLatitude("");
        setLongitude("");
        setAddress("");
        setAvailable(true);
        setCoverPhoto(null);
        setCoverPhotoPreview(null);
       
      }
    } catch {
      toast.error("Failed to create venue.");
    } */
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="lg:w-[70%]  max-w-4xl mx-auto lg:p-4 p-2 bg-white rounded-md shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Venue</h2>

        <label className="block mb-2 font-medium text-gray-700">
          Venue Name
          <input
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="Enter Venue Name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </label>

        <div className="w-full h-60 mb-8 border rounded-md flex flex-wrap gap-2 p-2 overflow-auto">
          {coverPhotoPreviews.length > 0 ? (
            coverPhotoPreviews.map((preview, index) => (
              <div key={index} className="w-32 h-32 relative">
                <Image
                  src={preview}
                  alt={`Cover ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Click to upload cover photos
            </div>
          )}

          <input
            id="coverPhotoInput"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const filesArray = Array.from(e.target.files);
                setCoverPhotos(filesArray);
                setCoverPhotoPreviews(
                  filesArray.map((f) => URL.createObjectURL(f))
                );
              }
            }}
            className="hidden"
          />
        </div>

        <div className="mb-4">
          <LocationPickerMap onLocationSelect={handleLocationSelect} />
        </div>

        {address && (
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>
        )}

        <label className="block mb-4 font-medium text-gray-700">
          Available
          <input
            type="checkbox"
            checked={available}
            onChange={() => setAvailable(!available)}
            className="ml-2"
          />
        </label>

        <button
          type="submit"
          //   disabled={isLoading}
          className="w-full bg-[#9473ad] hover:bg-[#71518a] text-white font-semibold py-2 rounded-md disabled:opacity-50"
        >
          {/* {isLoading ? "Creating..." : "Create Venue"} */}
        </button>
      </form>
    </>
  );
};

export default VenueCreate;
