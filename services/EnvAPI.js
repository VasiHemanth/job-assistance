export default function EnvAPI() {
  let apiUrl = "";
  if (process.env.NODE_ENV === "production") {
    apiUrl = "https://kariosys.vercel.app/";
  } else if (process.env.NODE_ENV === "development") {
    apiUrl = "http://localhost:8000/";
  }

  return apiUrl;
}
