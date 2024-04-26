export const headings = [
  { text: "NAME", id: "name" },
  { text: "EMAIL", id: "email" },
  { text: "FRIENDS", id: "friendsCount" },
  { text: "STATUS", id: "status" },
  { text: "ACTIONS", id: "action" },
];

export const ButtonNameWithStatus: any = {
  idle: "Send Request",
  pending: "Pending",
  connected: "connected",
};

export const NotificationActionStringMapper = {
  friend_request_received: "New friend request received",
  friend_request_accepted: "Your friend request has been accpeted",
  posted: "Your frind has udpated new satus",
} as any;
