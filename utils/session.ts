export function setCookieExpiry() {
  const today = new Date();
  const expiryDate = new Date(today);

  // change to millisecond
  expiryDate.setTime(today.getTime() + (3 * 24 * 60 * 60 * 1000));

  // Format the expiry date for the cookie
  const expiryString = expiryDate.toUTCString();
  const expiry = useCookie('expiryDate');
  expiry.value = expiryString;
}
