export default function ({ $auth, redirect }) {
  // If the user is not authenticated
  if ($auth.user.role_id != 2) {
    return redirect('/')
  }
}
