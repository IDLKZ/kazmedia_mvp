export default function ({ $auth, redirect }) {
  // If the user is not authenticated
  if ($auth.loggedIn) {
    if ($auth.user.role_id === 1){
      return redirect('/manager')
    } else {
      return redirect('/user/cabinet')
    }
  }
}
