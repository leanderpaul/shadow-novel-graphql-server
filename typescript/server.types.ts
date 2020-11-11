export interface Context {
  user: {
    uid: string;
    username: string;
  } | null;
  err: {
    code: string;
    message: string;
  } | null;
}
