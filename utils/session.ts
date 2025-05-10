export function isSessionExpired(expires_at: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000); // in seconds
  return expires_at < currentTime;
}
