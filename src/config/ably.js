import Ably from "ably/callbacks";

const ably_api_key =
  "uVw8ZQ.JeIy0w:oGVPDlf8XqW8GGYFkjpbMaxjGb7PFr0Go8xp7NMWB28";
const ably = new Ably.Realtime(ably_api_key);

export default ably;
