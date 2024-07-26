export async function GET() {
  // This is the default route for the search API and should return a json object with the search results
  return new Response(JSON.stringify({}), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
