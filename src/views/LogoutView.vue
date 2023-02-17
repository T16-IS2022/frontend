<script setup>
import { clearLoggedUser } from "../states/loggedUser.js";
import router from "@/router";

function logout() {
  clearLoggedUser();
  router.push("/");
}

logout();
</script>