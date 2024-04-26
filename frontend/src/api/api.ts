import { get, patch, post } from "./apiUtils";

const BASE_URL = "http://192.168.1.15:3000/api/v1";

export const LoginUser = ({ email }: { email: string }) => {
  const URL = BASE_URL + "/login";

  return post(URL, { user: { email } });
};

export const UpdateUser = ({
  first_name,
  last_name,
  userId,
}: {
  first_name: string;
  last_name: string;
  userId: string;
}) => {
  const URL = BASE_URL + `/users/${userId}`;

  return patch(URL, { user: { first_name, last_name } });
};

export const FetchUsers = (userId: string | null) => {
  const URL = BASE_URL + `/users?user_id=${userId}`;

  return get(URL);
};

export const FetchFriends = (userId: string | null) => {
  const URL = BASE_URL + `/users/${userId}/friends?user_id=${userId}`;

  return get(URL);
};

export const SendRequest = (
  userId: string | null,
  receiverId: string | null
) => {
  const URL = BASE_URL + `/friend_requests`;

  return post(URL, {
    friend_request: {
      receiver_id: receiverId,
    },
    user_id: userId,
  });
};

export const FetchRequests = (userId: string | null) => {
  const URL = BASE_URL + `/friend_requests?user_id=${userId}`;

  return get(URL);
};

export const AcceptRequests = (userId: string | null, requestId: string) => {
  const URL = BASE_URL + `/friend_requests/${requestId}/accept`;

  return post(URL, {
    user_id: userId,
  });
};

export const RejectRequests = (userId: string | null, requestId: string) => {
  const URL = BASE_URL + `/friend_requests/${requestId}/reject`;

  return post(URL, {
    user_id: userId,
  });
};

export const UpdateStatus = (userId: string | null, status: string) => {
  const URL = BASE_URL + `/status_updates`;

  return post(URL, {
    status_update: {
      context: status,
    },
    user_id: userId,
  });
};

export const FeedList = (userId: string | null) => {
  const URL = BASE_URL + `/status_updates?user_id=${userId}`;

  return get(URL);
};

export const NotificationsList = (userId: string | null) => {
  const URL = BASE_URL + `/notifications?user_id=${userId}`;

  return get(URL);
};
