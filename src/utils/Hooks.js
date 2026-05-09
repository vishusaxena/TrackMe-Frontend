import secureLocalStorage from "react-secure-storage";

const baseURL = "http://localhost:5000";
export const ApiCall = async (path, body = {}) => {
  const data = {
    ...body,
  };
  try {
    const res = await fetch(baseURL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const handleFileUpload = (event, setForm) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = reader.result.split(",")[1];
    // Removes "data:image/png;base64,"

    const fileName = file.name.split(".")[0];
    const fileExtension = file.name.split(".").pop();

    setForm((prev) => ({
      ...prev,
      imageBase64: base64String,
      imageName: fileName,
      imageExtension: fileExtension,
      isgoogleLoggedIn: true, // Set to false when user uploads a new image
    }));
  };

  reader.readAsDataURL(file);
};

export const setFocus = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.focus();
  }
};

export const formatDate = (timestamp = Date.now()) => {
  const date = new Date(timestamp);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day}${getOrdinal(day)} ${month} ${year}`;
};
