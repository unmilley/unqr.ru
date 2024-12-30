export default defineEventHandler(async (event) => {
  await sendRedirect(event, 'https://nuxt.com/', 302)
})
