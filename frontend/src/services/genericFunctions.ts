export const stringAvatar = (name: string) => {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

export const isEmail = (str: string): boolean => {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(str);
};

export const isValidName = (name: string | undefined): boolean => {
  const nameRegex = /^[a-zA-Z]+$/;

  if (!name) {
    return false;
  }

  if (!nameRegex.test(name)) {
    return false;
  }

  return true;
};

export const getName = (firstName: string, lastName: string) => {
  if (!firstName && !lastName) return "No Name";
  return `${firstName} ${lastName}`;
};

export const formatTimeAgo = (timestamp: number): string => {
  const now = new Date();
  const dt = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const timeDiff = now.getTime() - dt.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff <= 0) {
    return "Less than a day ago";
  } else if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else if (daysDiff < 30) {
    const weeks = Math.floor(daysDiff / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else {
    const months = Math.floor(daysDiff / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
};

export const formatTimestamp = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedDate = `${day}, ${month} ${year} ${hours % 12}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  return formattedDate;
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
};
