export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  return user.value ? true : navigateTo('/?error=U400')
})
